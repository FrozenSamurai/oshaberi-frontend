import { useEffect, useState } from "react";
import { getUserCommunities, joinCommunity } from "../firebase/communitiesApi";
import { getAuth } from "@firebase/auth";
import { Menu, notification, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import CommunityItem from "./CommunityItem";

const { Title } = Typography;

function AllCommunitiesList({ topics, setShowOpenMessageAlert }) {
  const [communities, setCommunities] = useState([]);

  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const user = getAuth().currentUser;

  useEffect(() => {
    getUserCommunities(user, (data) => {
      const new_data = { ...data };
      for (let key in new_data) {
        if (!Object.keys(topics).includes(key)) {
          delete new_data[key];
        }
      }
      setCommunities(new_data);
      setLoading(false);
    });
  }, [topics, user]);

  const onCommunityActionButtonClick = (community_id, joined) => {
    setShowOpenMessageAlert(false);
    if (joined) {
      const rooms = Object.keys(communities)
        .map((room_id) => {
          return {
            ...communities[room_id],
            room_id,
          };
        })
        .filter((room) => room.joined);

      history.push(`/communities`, {
        openRooms: rooms,
        currentRoomId: community_id,
        room_id: community_id,
      });
    } else {
      joinCommunity(user, community_id, (success) => {
        if (!success) {
          notification.error({
            message: "Failed to join community! Please try again later.",
          });
          return;
        }
        const rooms = Object.keys(communities)
          .map((room_id) => {
            return {
              ...communities[room_id],
              room_id,
            };
          })
          .filter((room) => room.joined || room.room_id === community_id);
        history.push(`/communities`, {
          openRooms: rooms,
          currentRoomId: community_id,
          room_id: community_id,
        });
      });
    }
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Spin />
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <Title
        style={{
          fontSize: 32,
          paddingLeft: 8,
          paddingRight: 8,
          marginBottom: "0.25em",
          textAlign: "center",
        }}
      >
        Communities
      </Title>
      <div style={{ overflowY: "scroll", height: "90%" }}>
        {Object.keys(communities).map((community) => {
          return (
            <CommunityItem
              key={community}
              community={community}
              communities={communities}
              communityMenu={communityMenu}
              setCommunities={setCommunities}
              onCommunityActionButtonClick={onCommunityActionButtonClick}
            />
          );
        })}
      </div>
    </div>
  );
}

const communityMenu = (onLeaveClick) => (
  <Menu>
    <Menu.Item key={1} danger onClick={onLeaveClick}>
      Leave
    </Menu.Item>
  </Menu>
);

export default AllCommunitiesList;
