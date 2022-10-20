import { Typography } from "antd";
import React, { useEffect, useState } from "react";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://oshaberi-backend.herokuapp.com"
    : "http://localhost:5000";

function GoogleSearch({ query }) {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetch(BASE_URL + "/googleSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, [query]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title>{query}</Typography.Title>
      {searchResults.map((result) => (
        <Typography.Paragraph key={result.link}>
          <a href={result.link}>{result.title}</a>
        </Typography.Paragraph>
      ))}
    </div>
  );
}

export default GoogleSearch;
