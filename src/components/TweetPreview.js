import { Tweet } from "react-twitter-widgets";

const TweetPreview = ({ id }) => {
  return <Tweet tweetId={id} style={{ maxWidth: 150 }} />;
};

export default TweetPreview;
