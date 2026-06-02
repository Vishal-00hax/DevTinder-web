import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFeed, appendFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + `/user/feed`, {
        withCredentials: true,
      });
      const newUsers = res.data.data || [];
      dispatch(addFeed(newUsers));
    } catch (err) {
      console.log("Error Fetching Feed: ", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl font-bold">No More Profiles Available</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
}

export default Feed;
