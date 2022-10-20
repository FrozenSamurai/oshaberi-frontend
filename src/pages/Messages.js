import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Row, Col } from "antd";

import RoomsList from "../components/RoomsList";
import ChatArea from "../components/ChatArea";
import { getMessages } from "../firebase/messageApi";
import { useHistory } from "react-router-dom";

const Messages = ({ showOpenMessageAlert, setShowOpenMessageAlert }) => {
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  // if (!location.state?.room_id) {
  //   setShowOpenMessageAlert(true);
  // }
  const history = useHistory();
  useEffect(() => {
    history.listen((loc, action) => {
      if (action === "POP" && !loc.state?.room_id) {
        setShowOpenMessageAlert(true);
      }
    });

    if (!location.state?.room_id) {
      setShowOpenMessageAlert(true);
    } else {
      setShowOpenMessageAlert(false);
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
  }, [
    history,
    location,
    location.state,
    location.state?.room_id,
    setShowOpenMessageAlert,
  ]);

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
          <RoomsList setShowOpenMessageAlert={setShowOpenMessageAlert} />
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
          />
        </Col>
      </Row>
    </div>
  );
};

export default Messages;
