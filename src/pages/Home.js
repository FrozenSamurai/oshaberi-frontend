import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import RoomsList from "../components/RoomsList";
import AllCommunitiesList from "../components/AllCommunitiesList";
import ExplorePreview from "../components/ExplorePreview";
import { getAuth } from "firebase/auth";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://oshaberi-backend.herokuapp.com"
    : "http://localhost:5000";

function Home({ setShowOpenMessageAlert }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getAuth().currentUser;
  useEffect(() => {
    setLoading(false);
    if (user?.uid) {
      fetch(BASE_URL + `/getUserTopics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.uid }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data === "", !data);
          if (!data) {
            setTopics([]);
          } else {
            setTopics(data);
          }
          setLoading(false);
        });
    }
    return () => {};
  }, [user.uid]);

  return (
    <div
      style={{ padding: 8, paddingBottom: 0, height: "calc(100vh - 76px)" }}
    >
      <Row gutter={16} style={{ height: "100%" }}>
        <Col span={8} style={{ borderRight: "1px #ddd solid" }}>
          <RoomsList
            showUserCluster
            topics={topics}
            setShowOpenMessageAlert={setShowOpenMessageAlert}
          />
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            width: "100%",
            overflowY: "hidden",
            justifyContent: "center",
            borderRight: "1px #ddd solid",
          }}
        >
          <ExplorePreview
            loading={loading}
            setLoading={setLoading}
            topics={topics}
          />
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyItems: "stretch",
          }}
        >
          <AllCommunitiesList
            topics={topics}
            setShowOpenMessageAlert={setShowOpenMessageAlert}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
