import { useState, useEffect, useRef } from "react";
import { Spin, Typography } from "antd";
import { fetchNews, fetchTweets } from "../utils/fetchContent";
import NewsPreview from "./NewsPreview";
import TweetPreview from "./TweetPreview";

const { Title } = Typography;

const ExplorePreview = ({ topics, loading, setLoading }) => {
  const [news, setNews] = useState([]);
  const [tweets, setTweets] = useState([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      setLoading(true);
      Object.keys(topics).forEach((topic) => {
        console.log(topic);
        fetchNews(
          topic,
          3,
          (data) => {
            console.log(data);
            setNews((state) => ({ ...state, [topic]: data }));
            setLoading(false);
          },
          (error) => {
            setLoading(false);
          }
        );
        fetchTweets(
          topic,
          3,
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
  }, [setLoading, topics]);

  return false ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Spin />
    </div>
  ) : (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <Title
        style={{
          fontSize: 32,
          paddingLeft: 8,
          paddingRight: 8,
          marginBottom: "0.25em",
          textAlign: "center",
        }}
      >
        ✨ <Typography.Link href={"/explore"}>Explore</Typography.Link> ✨
      </Title>
      <div
        style={{
          overflowY: "scroll",
          gap: "8px",
          maxHeight: "80vh",
        }}
      >
        {Object.keys(news).map((topic) =>
          news[topic].map((item, ind) => (
            <NewsPreview key={"news-explore-preview-" + ind} {...item} large />
          ))
        )}
        {Object.keys(tweets).map((topic) =>
          tweets[topic].map((item, ind) => (
            <TweetPreview key={"tweets-explore-preview-" + ind} {...item} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExplorePreview;
