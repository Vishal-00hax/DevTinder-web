import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Connection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);

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
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>

      {connections?.map((connection) => (
        <div key={connection._id} className="card bg-base-200 shadow-md mb-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start p-4">
            <div className="flex">
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-base-300"
                src={
                  connection.fromUserId.photoUrl ||
                  `https://ui-avatars.com/api/?name=${connection.fromUserId.firstName}`
                }
                alt="profile"
              />
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-base-300"
                src={
                  connection.toUserId.photoUrl ||
                  `https://ui-avatars.com/api/?name=${connection.fromUserId.firstName}`
                }
                alt="profile"
              />
            </div>
            <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0 sm:ml-5">
              <h2 className="text-xl font-bold">
                {connection.fromUserId.firstName}{" "}
                {connection.fromUserId.lastName}
              </h2>

              <p className="text-sm opacity-70 mt-1">Connected with</p>

              <p className="font-semibold">
                {connection.toUserId.firstName} {connection.toUserId.lastName}
              </p>

              <div className="mt-3">
                <span className="badge badge-success badge-lg">
                  {connection.status === "accepted" ? "Frinds" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
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
