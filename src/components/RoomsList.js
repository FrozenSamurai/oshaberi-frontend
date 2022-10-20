import { useEffect, useState } from "react";
import {
  Input,
  Typography,
  List,
  Avatar,
  Image,
  Button,
  Modal,
  message,
  Menu,
  Dropdown,
} from "antd";
import { useHistory, useLocation } from "react-router";
import { getAuth } from "@firebase/auth";
import { getOpenRooms } from "../firebase/messageApi";
import { DownOutlined } from "@ant-design/icons";
import UserCluster from "./UserCluster";

const { Search } = Input;
const { Title } = Typography;

const roomContextMenu = (onDelete, room_id) => (
  <Menu>
    <Menu.Item key="1" onClick={() => onDelete(room_id)}>
      Delete
    </Menu.Item>
  </Menu>
);

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://oshaberi-backend.herokuapp.com"
    : "http://localhost:5000";

function RoomsList({
  topics,
  showUserCluster,
  showUserRecommendation,
  setShowOpenMessageAlert,
}) {
  const location = useLocation();
  const [openRooms, setOpenRooms] = useState(location.state?.openRooms || []);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [searchUserId, setSearchUserId] = useState("");
  const [okLoading, setOkLoading] = useState(false);
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(
    location.state?.currentRoomId || null
  );
  const history = useHistory();
  const user = getAuth().currentUser;

  const formatted_topics = {};
  if (topics) {
    Object.keys(topics).forEach((topic) => {
      formatted_topics[topic] = Object.keys(topics[topic]).map((user_id) => {
        for (let room of openRooms) {
          if (room.recipient_id === user_id) {
            return {
              ...topics[topic][user_id],
              ...room,
            };
          }
        }
        return topics[topic][user_id];
      });
    });
    console.log(formatted_topics);
  }

  useEffect(() => {
    // fetch open rooms
    if (user?.uid) {
      getOpenRooms(user, (data) => {
        const formattedData = Object.keys(data).map((room_id) => {
          return {
            ...data[room_id],
            room_id,
          };
        });
        setOpenRooms((state) => {
          const newState = [];
          formattedData.forEach((room) => {
            if (newState.find((r) => r.room_id === room.room_id)) {
              return;
            } else {
              newState.push(room);
            }
          });
          if (state && state.length > 0) {
            state.forEach((room) => {
              if (newState.find((r) => r.room_id === room.room_id)) {
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

      return () => {};
    }
  }, [user]);

  const handleOk = () => {
    setOkLoading(true);

    const filteredOpenRooms = openRooms.filter((room) => {
      return room.recipient_id === searchUserId;
    });

    if (filteredOpenRooms.length === 1) {
      message.error("You already have a room with this user");
      setOkLoading(false);
      setSearchUserId("");
      setShowOpenMessageAlert(false);
      setNewMessageModalVisible(false);
      return;
    }

    if (searchUserId === user.uid) {
      message.error("You can't chat with yourself!");
      setOkLoading(false);
      setSearchUserId("");
      setShowOpenMessageAlert(false);
      setNewMessageModalVisible(false);
      return;
    }

    fetch(BASE_URL + `/checkUserIdExist/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: searchUserId,
        creator_id: user.uid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "false") {
          message.error("User ID does not exist");
        } else {
          history.push("/messages", {
            ...data,
            room_id: data.room_id,
            currentRoomId: data.room_id,
            openRooms: [data],
          });
        }
        setOkLoading(false);
        setSearchUserId("");
        setShowOpenMessageAlert(false);
        setNewMessageModalVisible(false);
      })
      .catch((err) => {
        console.error(err);
        setOkLoading(false);
        setSearchUserId("");
        setShowOpenMessageAlert(false);
        setNewMessageModalVisible(false);
      });
  };

  const handleCancel = () => {
    setSearchUserId("");
    setNewMessageModalVisible(false);
  };

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
        Messages
        <Button type="primary" onClick={() => setNewMessageModalVisible(true)}>
          New
        </Button>
      </Title>
      <Search
        placeholder="Search People"
        onSearch={console.log}
        style={{ width: "100%", marginBottom: 8 }}
      />
      {showUserCluster && <UserCluster clusters={formatted_topics} />}
      <List
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
                  <Image
                    referrerPolicy={"no-referrer"}
                    src={item.recipient_avatar}
                  />
                }
                size={38}
                style={{ marginRight: 8, flexShrink: 0 }}
              />
              <div
                onClick={() => {
                  setCurrentRoomId(item.room_id);
                  setShowOpenMessageAlert(false);
                  if (
                    currentRoomId !== item.room_id &&
                    location.pathname !== "/"
                  ) {
                    history.replace(`/messages`, {
                      ...item,
                      openRooms,
                      currentRoomId: item.room_id,
                    });
                    return;
                  }
                  (location.pathname !== "/messages" ||
                    !location.state?.room_id) &&
                    history.push("/messages", {
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
                    // overflowWrap: "break-word",
                    overflow: "hidden",
                  }}
                >
                  {item.recipient_name}
                </Typography.Text>
                <Typography.Text
                  italic
                  style={{
                    color: item.last_message_text ? undefined : "#6b6a6a",
                  }}
                >
                  {item.last_message_text ?? "No messages yet"}
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
      <Modal
        title="Enter User ID"
        visible={newMessageModalVisible}
        onOk={handleOk}
        okButtonProps={{
          disabled: !searchUserId.trim(),
          loading: okLoading,
        }}
        onCancel={handleCancel}
      >
        <Input
          placeholder="User ID"
          value={searchUserId}
          onChange={(value) => setSearchUserId(value.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
      </Modal>
    </>
  );
}

export default RoomsList;
