import {
  getDatabase,
  ref,
  push,
  query,
  onValue,
  get,
} from "firebase/database";
import { firebaseApp } from "./init";

const checkIfUserIdExists = (userId, callback) => {
  const db = getDatabase(firebaseApp);
  const userRef = ref(db, `user_data/${userId}`);
  get(userRef, (snapshot) => {
    if (snapshot.val()) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

const getOpenRooms = (user, callback) => {
  const db = getDatabase(firebaseApp);
  const roomsRef = ref(db, `user_data/${user.uid}/open_rooms`);
  onValue(roomsRef, (snapshot) => {
    callback(snapshot.val() ?? {});
  });
};

const getMessages = (roomId, callback) => {
  const db = getDatabase(firebaseApp);
  const messagesRef = ref(db, `messages/${roomId}`);
  onValue(messagesRef, (snapshot) => {
    callback(snapshot.val() ?? {});
  });
};

export { checkIfUserIdExists, getOpenRooms, getMessages };
