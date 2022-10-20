import { useState } from "react";
import {
  ArrowRightOutlined,
  EllipsisOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getAuth } from "@firebase/auth";
import { Button, Dropdown, notification, Popconfirm, Typography } from "antd";

import { leaveCommunity } from "../firebase/communitiesApi";

const { Paragraph, Title } = Typography;

const CommunityItem = ({
  community,
  communities,
  communityMenu,
  setCommunities,
  onCommunityActionButtonClick,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const user = getAuth().currentUser;

  const onCommunityLeave = () => {
    setShowDeleteConfirm(false);
    leaveCommunity(user, community, (success) => {
      if (success) {
        setCommunities((prevCommunities) => {
          const newCommunities = { ...prevCommunities };
          newCommunities[community].joined = false;
          newCommunities[community].memberCount -= 1;
          return newCommunities;
        });
        notification.success({ message: `You have left ${community}!` });
      } else {
        notification.error({
          message: `Could not leave ${community}! Please try again later`,
        });
      }
    });
  };

  return (
    <div
      key={community}
      style={{
        height: 200,
        width: "100%",
        backgroundImage: `url('/assets/${communities[community].backgroundImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 12,
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <Dropdown
          trigger={["click"]}
          overlay={() => communityMenu(() => setShowDeleteConfirm(true))}
        >
          <Popconfirm
            visible={showDeleteConfirm}
            title={`Are you sure you want to leave ${community}?`}
            onConfirm={onCommunityLeave}
            onCancel={() => setShowDeleteConfirm(false)}
            okText="Leave"
            cancelText="Cancel"
          >
            <EllipsisOutlined
              rotate={90}
              style={{ color: "#eee", fontSize: 18 }}
            />
          </Popconfirm>
        </Dropdown>
      </div>
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 28,
        }}
      >
        <Title
          style={{
            color: "#eee",
            marginBottom: 0,
          }}
          level={2}
        >
          {community}
        </Title>
        <Paragraph
          style={{
            color: "#eee",
          }}
        >
          {communities[community].description}
        </Paragraph>
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserOutlined style={{ color: "#8CFBDE" }} />
          <div style={{ marginLeft: 8 }}>
            <span style={{ color: "#8CFBDE", marginBottom: 0 }}>
              {communities[community].memberCount}{" "}
              {communities[community].memberCount === 1 ? "member" : "members"}
            </span>
          </div>
        </div>
      </div>
      <Button
        type={communities[community].joined ? "default" : "primary"}
        onClick={() =>
          onCommunityActionButtonClick(
            community,
            communities[community].joined
          )
        }
        style={{ bottom: 16, right: 16, position: "absolute" }}
      >
        {communities[community].joined ? "Open" : "Join"}
        {communities[community].joined ? (
          <ArrowRightOutlined />
        ) : (
          <PlusOutlined />
        )}
      </Button>
    </div>
  );
};

export default CommunityItem;
