import React from "react";
import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const NewsPreview = ({
  description,
  publishedAt,
  title,
  url,
  urlToImage,
  content,
  source,
  large,
}) => {
  return (
    <div
      style={{
        // border: "1px solid #aaa",
        height: large ? 220 : 200,
        margin: 8,
        marginTop: 0,
        borderRadius: 2,
        // boxShadow: "rgb(100 100 100 / 20%) 1px 1px 6px",
        backgroundImage: `url(${urlToImage})`,
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      ></div>
      <div
        style={{
          color: "#eee",
          margin: 12,
          maxHeight: large ? 170 : 140,
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
        }}
      >
        <Title
          level={large ? 4 : 5}
          style={{ color: "#eee", marginBottom: 0 }}
        >
          {title}
        </Title>
        <Text
          style={{
            color: "#999",
            textAlign: "right",
            width: "100%",
            display: "block",
          }}
        >
          ~ {source.name}
        </Text>
        <Paragraph
          style={{
            marginBottom: 0,
            color: "#eee",
            marginTop: 8,
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Paragraph>
      </div>
      <Text
        style={{
          color: "#bbb",
          position: "absolute",
          bottom: 12,
          left: 12,
        }}
      >
        {new Date(publishedAt).toLocaleDateString("en-US", options)}
      </Text>

      <Button
        href={url}
        type={"link"}
        target={"_blank"}
        rel={"noopener noreferrer"}
        style={{ marginLeft: 4, bottom: 8, position: "absolute", right: 8 }}
      >
        View Article <ArrowRightOutlined />
      </Button>
    </div>
  );
};

export default NewsPreview;
