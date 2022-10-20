import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Row, Col } from "antd";

import ChatArea from "../components/ChatArea";
import { getMessages } from "../firebase/messageApi";
import CommunitiesList from "../components/CommunitiesList";

const Communities = ({ showOpenMessageAlert, setShowOpenMessageAlert }) => {
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.room_id) {
      // no previous chat history
    } else {
      getMessages(location.state.room_id, (data) => {
        if (data) {
          const formattedData = Object.keys(data).map((id) => {
            return {
              id,
              ...data[id],
            };
          });

          setMessages(formattedData);
        }
      });
    }
    return () => {};
  }, [location.state, location.state?.room_id]);

  return (
    <div
      style={{
        padding: 8,
        paddingBottom: 0,
        height: "calc(100vh - 76px)",
      }}
    >
      <Row gutter={16} style={{ height: "100%", marginRight: 0 }}>
        <Col span={8} style={{ borderRight: "1px #ddd solid" }}>
          <CommunitiesList
            setMessages={setMessages}
            showOpenMessageAlert={showOpenMessageAlert}
            setShowOpenMessageAlert={setShowOpenMessageAlert}
          />
        </Col>
        <Col
          span={16}
          style={{
            display: "flex",
            flexDirection: showOpenMessageAlert ? undefined : "column-reverse",
            backgroundColor: "#8ec8ff",
            marginBottom: -4,
          }}
        >
          <ChatArea
            roomData={location.state}
            messages={messages}
            setMessages={setMessages}
            showOpenMessageAlert={showOpenMessageAlert}
            communities
          />
        </Col>
      </Row>
    </div>
  );
};

export default Communities;
