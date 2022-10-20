import { useEffect, useState } from "react";
import {
  Typography,
  List,
  Avatar,
  Image,
  message,
  Menu,
  Dropdown,
  Empty,
} from "antd";
import { useHistory, useLocation } from "react-router";
import { getAuth } from "@firebase/auth";
import { DownOutlined } from "@ant-design/icons";
import { getUserCommunities } from "../firebase/communitiesApi";

const { Title } = Typography;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://oshaberi-backend.herokuapp.com"
    : "http://localhost:5000";

const roomContextMenu = (onDelete, room_id) => (
  <Menu>
    <Menu.Item key="1" danger onClick={() => onDelete(room_id)}>
      Leave
    </Menu.Item>
  </Menu>
);

function CommunitiesList({ showOpenMessageAlert, setShowOpenMessageAlert }) {
  const location = useLocation();
  const [openRooms, setOpenRooms] = useState(location.state?.openRooms || []);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState(
    location.state?.currentRoomId || null
  );
  const history = useHistory();
  const user = getAuth().currentUser;

  useEffect(() => {
    if (location.state?.currentRoomId) {
      setShowOpenMessageAlert(false);
    }
    getUserCommunities(user, (data) => {
      const formattedData = Object.keys(data).map((room_id) => {
        return {
          ...data[room_id],
          room_id,
        };
      });
      setOpenRooms((state) => {
        const newState = [];
        formattedData.forEach((room) => {
          if (
            newState.find((r) => r.room_id === room.room_id) ||
            !room.joined
          ) {
            return;
          } else {
            newState.push(room);
          }
        });
        if (state && state.length > 0) {
          state.forEach((room) => {
            if (
              newState.find((r) => r.room_id === room.room_id || !room.joined)
            ) {
              return;
            } else {
              newState.push(room);
            }
          });
        }
        setLoadingRooms(false);
        return newState;
      });
    });
  }, [location.state?.currentRoomId, setShowOpenMessageAlert, user]);

  const onRoomDelete = (room_id) => {
    fetch(BASE_URL + `/deleteRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id,
        creator_id: user.uid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          message.success("Room deleted successfully");
          setOpenRooms(openRooms.filter((room) => room.room_id !== room_id));
          history.replace("/");
        } else {
          message.error("Error deleting room");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Title
        style={{
          fontSize: 32,
          paddingLeft: 8,
          paddingRight: 8,
          marginBottom: "0.25em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Communities
      </Title>
      <List
        style={{
          height: "90%",
          display: Object.keys(openRooms || {}).length ? undefined : "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        locale={{
          emptyText: (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Empty description="" />
              You haven't joined any communities yet!
            </div>
          ),
        }}
        dataSource={openRooms}
        loading={loadingRooms}
        renderItem={(item, index) => (
          <List.Item
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              alignItems: "center",
              padding: 8,
              backgroundColor:
                currentRoomId === item.room_id ? "#8ec8ff" : undefined,
            }}
          >
            <span style={{ display: "flex", flexGrow: 1 }}>
              <Avatar
                src={
                  <Image referrerPolicy={"no-referrer"} src={item.iconURL} />
                }
                size={38}
                style={{ marginRight: 8, flexShrink: 0 }}
              />
              <div
                onClick={() => {
                  setCurrentRoomId(item.room_id);
                  setShowOpenMessageAlert(false);
                  if (currentRoomId !== item.room_id) {
                    history.replace(`/communities`, {
                      ...item,
                      currentRoomId: item.room_id,
                      openRooms,
                    });
                    return;
                  }
                  (location.pathname !== "/communities" ||
                    !location.state?.room_id) &&
                    history.push("/communities", {
                      ...item,
                      openRooms,
                      currentRoomId: item.room_id,
                    });
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography.Text
                  style={{
                    fontSize: 14,
                    height: 20,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {item.room_id}
                </Typography.Text>
                <Typography.Text italic>
                  {item.last_message_text ?? ""}
                </Typography.Text>
              </div>
            </span>
            <Dropdown
              overlay={() => roomContextMenu(onRoomDelete, item.room_id)}
              trigger={["click"]}
            >
              <DownOutlined />
            </Dropdown>
          </List.Item>
        )}
      />
    </>
  );
}

export default CommunitiesList;
