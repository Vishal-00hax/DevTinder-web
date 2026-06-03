import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect, useState } from "react";
import { addRequests, removeRequests } from "../utils/requetsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Requests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastMessgae, setToastMessage] = useState("");
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.requests);
  console.log("Requests from Requests.jsx:", requests);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/recived", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  setTimeout(() => {
    setToastMessage("");
  }, 3000);

  const handleRequestStatus = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(requestId));
      setToastMessage(res.data.message);
    } catch (err) {
      console.log("Error in reviewing request ", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Connection Requests
      </h1>

      {requests?.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="card bg-base-200 shadow-md mb-5">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={
                    request.fromUserId.photoUrl ||
                    `https://ui-avatars.com/api/?name=${request.fromUserId.firstName}+${request.fromUserId.lastName}`
                  }
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="card-title justify-center sm:justify-start">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h2>

                  <p className="text-sm opacity-70">
                    {request.fromUserId.age} years • {request.fromUserId.gender}
                  </p>

                  <p className="mt-2">
                    <span className="font-semibold">Skills:</span>{" "}
                    {request.fromUserId.skills.join(", ")}
                  </p>

                  <div className="mt-3">
                    <span className="badge badge-info">{request.status}</span>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-center sm:justify-end mt-4">
                <button
                  className="btn btn-error"
                  onClick={() => handleRequestStatus("accepted", request._id)}
                >
                  Reject
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => handleRequestStatus("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg">No Requests Found</div>
      )}
      {toastMessgae && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">{toastMessgae}</div>
        </div>
      )}
    </div>
  );
}

export default Requests;
