import { useState, useEffect, useRef } from "react";
import { Typography, Tabs, Spin } from "antd";
import { fetchNews, fetchTweets } from "../utils/fetchContent";
import NewsPreview from "../components/NewsPreview";
import TweetPreview from "../components/TweetPreview";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const { Title } = Typography;
const { TabPane } = Tabs;

const topics = ["cricket", "football"];

function Explore() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState({});
  const [tweets, setTweets] = useState({});
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      setLoading(true);
      topics.forEach((topic) => {
        fetchNews(
          topic,
          5,
          (data) => {
            setNews((state) => ({ ...state, [topic]: data }));
            // setLoading(false);
          },
          (error) => {
            setLoading(false);
          }
        );
        fetchTweets(
          topic,
          5,
          (data) => {
            setTweets((state) => ({ ...state, [topic]: data }));
            setLoading(false);
          },
          (error) => {
            setLoading(false);
          }
        );
      });
      mounted.current = true;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div style={{ padding: 28 }}>
      <Title level={1}>Explore</Title>
      <hr />
      {/* <Title level={2}>News</Title>
      
      <hr />
      <Title level={2}>Tweets</Title> */}

      <Tabs centered size="large" defaultActiveKey="1" onChange={console.log}>
        <TabPane tab="News" key="1">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: 8,
              padding: "2rem 2rem",
              width: "100%",
            }}
          >
            {Object.keys(news).map((topic) =>
              news[topic].map((item, ind) => (
                <NewsPreview key={"news-explore-" + ind} {...item} large />
              ))
            )}
          </div>
        </TabPane>
        <TabPane tab="Tweets" key="2">
          <div
            style={{
              // display: "grid",
              // gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
              gap: 8,
              padding: "2rem 2rem",
              width: "100%",
              display: loading ? "flex" : "unset",
              justifyContent: loading ? "center" : "unset",
              alignItems: loading ? "center" : "unset",
            }}
          >
            {loading ? (
              <Spin />
            ) : (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter={8}>
                  {Object.keys(tweets).map((topic) =>
                    tweets[topic].map((item, ind) => (
                      <TweetPreview key={"tweet-explore-" + ind} {...item} />
                    ))
                  )}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Explore;
