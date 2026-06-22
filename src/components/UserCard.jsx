import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function UserCard({ user }) {
  const [requestToast, setRequestToast] = useState("");
  const [requestLimitToast, setRequestLimitToast] = useState(false);
  const [error, setError] = useState("");
  const { firstName, lastName, photoUrl, age, skills, gender, _id } = user;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  const genralUsers = String(loggedInUser?._id) !== String(_id);
  const navigate = useNavigate();

  setTimeout(() => {
    setRequestToast("");
  }, 1000);

  const sendRequestStatus = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true },
      );
      setRequestToast(res.data.message);

      dispatch(removeFeed(toUserId));
    } catch (err) {
      if (err.response || err.response.status === 403) {
        setRequestLimitToast(true);
      }
      setError(err.response?.data || err.message || res.message);
    }
  };

  return (
    <>
      {requestLimitToast === true ? (
        <div className="card w-96 bg-base-200 shadow-xl border border-base-300">
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-warning"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 4h.01M10.29 3.86l-7.2 12.48A2 2 0 004.8 19h14.4a2 2 0 001.71-2.66l-7.2-12.48a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <h2 className="card-title mt-4 text-xl">
              Daily Request Limit Reached
            </h2>

            <p className="text-base-content/70 leading-relaxed">
              You've used all available connection requests for today. New
              requests will be available again tomorrow.
            </p>

            <div className="divider my-1"></div>

            <div className="bg-base-100 rounded-xl p-4 border border-base-300 w-full">
              <p className="font-medium">
                Want to connect with more developers?
              </p>

              <p className="text-sm text-base-content/70 mt-2">
                Upgrade to Premium and unlock higher daily request limits,
                priority visibility, and faster networking opportunities.
              </p>
            </div>

            <div className="badge badge-warning badge-outline mt-3">
              Request Limit Exhausted
            </div>

            <button
              className="btn btn-primary btn-wide mt-4"
              onClick={() => navigate("/premium")}
            >
              Explore Premium Plans
            </button>
          </div>
        </div>
      ) : (
        <div className="card bg-base-200 w-96 shadow-sm">
          <figure>
            <img
              src={
                photoUrl ||
                `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
              }
              alt="photo"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName || "-"} {lastName || "-"}
            </h2>
            <p>Age : {age}</p>
            <p>Gender : {gender.toUpperCase() || "-"}</p>
            <p>{skills.join(", ").toUpperCase() || "-"}</p>
            <p></p>
            {genralUsers && (
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  onClick={() => sendRequestStatus("ignored", _id)}
                >
                  Ingnore
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => sendRequestStatus("interested", _id)}
                >
                  Send Request
                </button>
              </div>
            )}
          </div>
          {requestToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">{requestToast}</div>
            </div>
          )}
          {error && <p className="text-center text-red-600">{error}</p>}
        </div>
      )}
    </>
  );
}

export default UserCard;
