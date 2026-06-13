import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFeed, appendFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async (pageNumber) => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/user/feed?page=${pageNumber}&limit=10`,
        {
          withCredentials: true,
        },
      );
      const newUsers = res.data.data || [];
      if (pageNumber === 1) {
        dispatch(addFeed(newUsers));
      } else {
        dispatch(appendFeed(newUsers));
      }
      setHasMore(res.data.hasMore);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load (Component Mount)
  useEffect(() => {
    if (!feed) {
      fetchFeed(1);
    }
  }, []);

  // Pre-fetch Logic (Watches the feed length)
  useEffect(() => {
    if (feed && feed.length <= 2 && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFeed(nextPage);
    }
  }, [feed]);

  if (!feed && loading) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl">Please Login</h1>
      </div>
    );
  }

  if ((feed?.length ?? 0) === 0 && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-3">No More Profiles</h1>

          <p className="text-base-content/70 mb-6">
            You've reviewed all available developer profiles for now. Check back
            later to discover new connections.
          </p>

          <div className="badge badge-outline badge-lg">
            You're all caught up 🎉
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-10">
      {feed?.length > 0 && <UserCard user={feed[0]} />}

      {loading && page > 1 && (
        <div className="text-sm text-gray-400 mt-4 absolute -bottom-10">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-sm text-gray-400 mt-4 absolute -bottom-10">
          {error}
        </div>
      )}
    </div>
  );
}

export default Feed;
