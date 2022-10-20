import { useState, useRef } from "react";
import {
  BulbOutlined,
  DeleteOutlined,
  DownOutlined,
  RollbackOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Dropdown, Menu, Popconfirm, notification, Avatar } from "antd";

const Message = ({
  message,
  user,
  onSuggestContentClick,
  setSearchQuery,
  communities,
  onDeleteClick,
  room_id,
}) => {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const messageRef = useRef(null);

  return (
    <div
      ref={messageRef}
      key={message.id}
      style={{
        justifyContent:
          user.uid === message.creator_id ? "flex-end" : "flex-start",
        display: "flex",
        alignItems: "flex-start",
        flexShrink: 1,
        height: "auto",
        width: "100%",
        // animation: "show 0.5s linear 1s forwards",
      }}
    >
      <Popconfirm
        title="Delete this message?"
        onConfirm={() => {
          onDeleteClick(room_id, message.id);
          notification["success"]({ message: "Message deleted!" });
        }}
        onCancel={() => {}}
        okText="Delete"
        cancelText="Cancel"
        visible={deleteConfirmVisible}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {communities && message.creator_id !== user.uid && (
            <Avatar
              src={message.creator_avatar}
              size="large"
              style={{ marginRight: 8 }}
            />
          )}
          <Card
            size="small"
            title={message.creator_name}
            headStyle={{ fontWeight: "bold" }}
            extra={
              <Dropdown
                overlay={() =>
                  menu(
                    () => {},
                    () => {},
                    (e) => {
                      setSearchQuery(message.message);
                      onSuggestContentClick(message.message);
                    },
                    () => setDeleteConfirmVisible(true),
                    message.creator_id === user.uid
                  )
                }
                trigger={["click"]}
              >
                <DownOutlined style={{ marginLeft: 4, cursor: "pointer" }} />
              </Dropdown>
            }
            style={{
              marginBottom: 8,
              maxHeight: 200,
              marginRight: 8,
              minWidth: 130,
            }}
          >
            <p style={{ margin: 0 }}>{message.message}</p>
          </Card>
        </div>
      </Popconfirm>
    </div>
  );
};

const menu = (
  onReplyClick,
  onStarClick,
  onSuggestContentClick,
  onDeleteClick,
  ownerMessage
) => (
  <Menu>
    <Menu.Item key="1" icon={<RollbackOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href=".">
        Reply
      </a>
    </Menu.Item>
    <Menu.Item key="2" icon={<StarOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href=".">
        Star
      </a>
    </Menu.Item>
    <Menu.Item key="3" icon={<BulbOutlined />} onClick={onSuggestContentClick}>
      Show Content
    </Menu.Item>

    {ownerMessage && (
      <Menu.Item
        key="4"
        danger
        icon={<DeleteOutlined />}
        onClick={onDeleteClick}
      >
        Delete
      </Menu.Item>
    )}
  </Menu>
);

export default Message;
