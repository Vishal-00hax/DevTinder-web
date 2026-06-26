import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function Connection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const loggedInUser = useSelector((store) => store.user);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError("");
    }, 1000);
    return clearTimeout(timer);
  }, [error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (connections.length === 0 || !connections) {
    return <div>No Connections Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-base-300 pb-4 gap-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content text-center sm:text-left">
            Connections
          </h1>
          <p className="text-sm text-base-content/60 text-center sm:text-left mt-0.5">
            Network members you have successfully matched with.
          </p>
        </div>

        <span className="badge badge-primary badge-md font-bold px-3 py-2.5 shadow-sm">
          {connections?.length || 0} Total
        </span>
      </div>

      {/* Feed Container */}
      <div className="space-y-4">
        {connections?.map((connection) => {
          // 2. Logic Check: Determine if the match target is fromUserId or toUserId
          // If the logged-in user id matches the sender, display the receiver details instead.
          const showUser =
            loggedInUser?._id === connection.fromUserId?._id
              ? connection.toUserId
              : connection.fromUserId;

          // Fail-safe protection if user objects are missing/undefined
          if (!showUser) return null;

          return (
            <div
              key={connection._id}
              className="card bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl group overflow-hidden"
            >
              <div className="card-body p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* User Bio Information Block */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 w-full sm:w-auto">
                  {/* Avatar Frame Wrapper */}
                  <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-base-300 group-hover:ring-primary/40 transition-all"
                      src={
                        showUser.photoUrl ||
                        `https://ui-avatars.com/api/?name=${showUser.firstName}`
                      }
                      alt="profile"
                    />
                    {connection.status === "accepted" && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-base-100 animate-pulse"></span>
                    )}
                  </div>

                  {/* Text Meta Content */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-base-content tracking-tight">
                        {showUser.firstName} {showUser.lastName}
                      </h2>
                      {connection.status === "accepted" && (
                        <span className="badge badge-success/10 text-success border-none text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                          Friends
                        </span>
                      )}
                    </div>

                    {/* Profile Details Tags */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs font-semibold text-base-content/60 mt-1.5">
                      <span className="px-2 py-0.5 bg-base-200 rounded-md">
                        Age: {showUser.age}
                      </span>
                      <span className="w-1 h-1 bg-base-content/30 rounded-full"></span>
                      <span className="px-2 py-0.5 bg-base-200 rounded-md capitalize">
                        Gender: {showUser.gender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Actions Container Block */}
                {loggedInUser?.isPremium && (
                  <div className="w-full sm:w-auto shrink-0 flex justify-center sm:justify-end">
                    <Link
                      to={`/chats/${showUser._id}`}
                      className="w-full sm:w-auto"
                    >
                      <button className="btn btn-primary btn-sm md:btn-md w-full sm:w-auto font-bold uppercase tracking-wider gap-2 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 px-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Chats
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {error && (
        <div className="toast -top toast-center">
          <div className="alert alert-info">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Connection;
