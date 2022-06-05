import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";
import MasonryLayout from "../MasonryLayout";
import Spinner from "../Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
      </div>
    );
  }
  if (pins && pins.length > 0) {
    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <Spinner message={`There is no pins here :(`} />
    </div>
  );
};

export default Feed;
