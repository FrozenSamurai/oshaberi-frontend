import { useState } from "react";
import { Avatar, Image, Tabs } from "antd";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;
const UserCluster = ({ clusters }) => {
  console.log(clusters);
  const newClusters = Object.fromEntries(Object.entries(clusters));
  // if (Object.keys(clusters).length > 0)
  //   newClusters["Disaster"] = Array(5).fill(clusters["Disaster"][0]);
  console.log(newClusters);
  const [activeKey, setActiveKey] = useState("cluster0");
  const history = useHistory();
  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  return (
    <div style={{ padding: 8 }}>
      <Tabs
        defaultActiveKey={activeKey}
        activeKey={activeKey}
        onChange={onChange}
      >
        {Object.keys(newClusters).map((topic, ind) => {
          console.log(ind);
          return (
            <TabPane
              style={{ overflowX: "scroll" }}
              tab={topic}
              key={"cluster" + ind}
            >
              {newClusters[topic].map((user) => (
                <div
                  key={"topic-" + topic + "-user-" + user.uid}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexShrink: 1,
                  }}
                >
                  <Avatar
                    src={
                      <Image
                        referrerPolicy={"no-referrer"}
                        src={user.avatar}
                      />
                    }
                    style={{ margin: "0 auto" }}
                    size={64}
                  />
                  <div
                    onClick={() =>
                      history.push("/messages", {
                        room_id: user.room_id,
                        currentRoomId: user.room_id,
                      })
                    }
                    style={{
                      textAlign: "center",
                      width: "100%",
                      cursor: "pointer",
                      color: "blue",
                    }}
                  >
                    {user.name}
                  </div>
                </div>
              ))}
            </TabPane>
          );
        })}
      </Tabs>
      <hr />
    </div>
  );
};

export default UserCluster;
