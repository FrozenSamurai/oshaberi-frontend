import { getDatabase, ref, get, child, set, update } from "firebase/database";
import { firebaseApp } from "./init";

const getUserCommunities = (user, callback) => {
  const dbRef = ref(getDatabase(firebaseApp));
  get(child(dbRef, `communities`))
    .then((snapshot) => {
      const allCommunities = snapshot.val();

      get(child(dbRef, `user_data/${user.uid}/communities`))
        .then((snapshot) => {
          const userCommunities = snapshot.val() || {};
          const allCommunitiesKeys = Object.keys(allCommunities);
          const modifiedCommunities = allCommunitiesKeys.reduce((acc, key) => {
            if (userCommunities[key]) {
              acc[key] = {
                ...allCommunities[key],
                ...userCommunities[key],
                joined: true,
                room_id: key,
              };
            } else {
              acc[key] = {
                ...allCommunities[key],
                ...userCommunities[key],
                joined: false,
                room_id: key,
              };
            }
            return acc;
          }, {});
          callback(modifiedCommunities);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const joinCommunity = (user, community_id, callback) => {
  const dbRef = ref(getDatabase(firebaseApp));
  const userCommunityRef = child(
    dbRef,
    `user_data/${user.uid}/communities/${community_id}`
  );
  set(userCommunityRef, true)
    .then(() => {
      get(child(dbRef, `communities/${community_id}/memberCount`))
        .then((snap) => {
          update(child(dbRef, `communities/${community_id}/`), {
            memberCount: snap.val() + 1,
          })
            .then(() => callback(true))
            .catch((error) => {
              console.log(error);
              callback(false);
            });
        })
        .catch((error) => {
          console.log(error);
          callback(false);
        });
    })
    .catch((error) => {
      console.log(error);
      callback(false);
    });
};

const leaveCommunity = (user, community_id, callback) => {
  const dbRef = ref(getDatabase(firebaseApp));
  const userCommunityRef = child(
    dbRef,
    `user_data/${user.uid}/communities/${community_id}`
  );
  set(userCommunityRef, null)
    .then(() => {
      get(child(dbRef, `communities/${community_id}/memberCount`))
        .then((snap) => {
          update(child(dbRef, `communities/${community_id}/`), {
            memberCount: snap.val() - 1,
          })
            .then(() => callback(true))
            .catch((error) => {
              console.log(error);
              callback(false);
            });
        })
        .catch((error) => {
          console.log(error);
          callback(false);
        });
    })
    .catch((error) => {
      console.log(error);
      callback(false);
    });
};

export { getUserCommunities, joinCommunity, leaveCommunity };
