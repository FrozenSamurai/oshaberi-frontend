import { useRef, useEffect, useState } from "react";
import {
  Row,
  Col,
  Drawer,
  Spin,
  Typography,
  Empty,
  notification,
  Button,
} from "antd";
import { ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { getAuth } from "@firebase/auth";
import Message from "./Message";
import Filter from "bad-words";
import { fetchGoogleSearch } from "../utils/fetchContent";

const suffix = (onClick) => (
  <SendOutlined
    onClick={onClick}
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://oshaberi-backend.herokuapp.com"
    : "http://localhost:5000";

const ChatArea = ({
  messages,
  roomData,
  communities,
  setMessages,
  showOpenMessageAlert,
}) => {
  const container = useRef(null);
  const [contentDrawer, setContentDrawer] = useState(false);
  const [sendButtonLoading, setSendButtonLoading] = useState(false);
  const [messageCounter, setMessageCounter] = useState(0);
  const [googleSearch, setGoogleSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filter = new Filter();

  const user = getAuth().currentUser;

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop =
        container.current.scrollHeight - container.current.clientHeight;
    }
  }, [messages]);

  const onSendMessageClick = () => {
    const { room_id, recipient_id, recipient_name, recipient_avatar } =
      roomData;

    if (!typedMessage.length) return;
    setSendButtonLoading(true);
    setTypedMessage("");

    if (filter.isProfane(typedMessage)) {
      setSendButtonLoading(false);
      notification.error({
        message: "Profanity detected",
        description: "Please refrain from using profanity",
      });
      return;
    }

    const dataToSend = communities
      ? {
          room_id,
          message: typedMessage,
          creator_id: user.uid,
          creator_name: user.displayName,
          creator_avatar: user.photoURL,
          timestamp: new Date().toISOString(),
        }
      : {
          message: typedMessage,
          creator_id: user.uid,
          creator_name: user.displayName,
          room_id,
          recipient_id,
          recipient_name,
          recipient_avatar,
          timestamp: new Date().toISOString(),
        };

    fetch(BASE_URL + "/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([
          ...messages,
          {
            id: data.key,
            creator_id: user.uid,
            message: typedMessage,
            creator_name: user.displayName,
          },
        ]);
        setMessageCounter((state) => {
          console.log(state);
          return state + 1;
        });
        if ((messageCounter + 1) % 5 === 0) {
          console.log(JSON.stringify({ room_id }));
          console.log("10 messages sent");
          fetch(BASE_URL + `/getTopic`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ room_id }),
          })
            .then((data) => data.text())
            .then((data) => {
              console.log(data);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSendButtonLoading(false));
  };

  const onSuggestContentClick = (message) => {
    setLoading(true);
    fetchGoogleSearch(
      message,
      5,
      (data) => {
        console.log(data);
        setGoogleSearch(data);
        setLoading(false);
      },
      console.error
    );
    setContentDrawer(true);
  };

  const onSuggestContentDrawerClose = () => {
    setContentDrawer(false);
  };

  const onDeleteClick = (room_id, message_id) => {
    fetch(BASE_URL + "/deleteMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        room_id,
        message_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          setMessages(messages.filter((message) => message.id !== message_id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        {!showOpenMessageAlert ? (
          <Row>
            <div
              ref={container}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflowY: "scroll",
                height: "calc(((100vh - 64px) - 48px) - 8px)",
                paddingTop: 8,
              }}
            >
              <div style={{ flexGrow: 1 }} />
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  onDeleteClick={onDeleteClick}
                  onSuggestContentClick={onSuggestContentClick}
                  setSearchQuery={setSearchQuery}
                  room_id={roomData.room_id}
                  communities={communities}
                  user={user}
                />
              ))}
            </div>
            <Col span={24}>
              <Input
                size="large"
                placeholder="Type your message..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                suffix={
                  sendButtonLoading ? (
                    <Spin size={"small"} />
                  ) : (
                    suffix(onSendMessageClick)
                  )
                }
                onPressEnter={onSendMessageClick}
                style={{ marginBottom: 8, marginTop: "auto" }}
              />
            </Col>
          </Row>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Empty
              description={`Click on a ${
                communities ? "community" : "message"
              } to start chatting!`}
            />
          </div>
        )}
      </div>
      <Drawer
        title="Content Suggestion"
        placement="right"
        onClose={onSuggestContentDrawerClose}
        visible={contentDrawer}
      >
        {/* <GoogleSearch query={searchQuery} /> */}
        <Typography.Title level={3}>Google Search</Typography.Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            justifyContent: loading ? "center" : undefined,
            alignItems: "center",
            gap: 12,
          }}
        >
          {loading ? (
            <Spin />
          ) : (
            googleSearch.map((result) => (
              <div key={result.link}>
                <a href={result.link}>{result.title}</a>
                <Typography.Paragraph>{result.snippet}</Typography.Paragraph>
                <Button href={result.link}>
                  Visit Page
                  <ArrowRightOutlined />
                </Button>
              </div>
            ))
          )}
        </div>
      </Drawer>
    </>
  );
};

export default ChatArea;
