import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";

function UserCard({ user }) {
  const [requestToast, setRequestToast] = useState("");
  const [error, setError] = useState("");
  const { firstName, lastName, photoUrl, age, skills, gender, _id } = user;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  const genralUsers = String(loggedInUser?._id) !== String(_id);

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
      setError(err.response?.data || err.message || res.message);
    }
  };

  return (
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
  );
}

export default UserCard;
