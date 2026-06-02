import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constents";
import useLogout from "../hooks/useLogout";
import EditProfile from "./EditProfile"; // Adjust path if needed

function Profile() {
  const profileData = useSelector((store) => store.user);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  const handleLogout = useLogout();

  const handleChangePassword = async () => {
    try {
      if (isPasswordChanging) return;
      setIsPasswordChanging(true);
      const res = await axios.patch(
        BASE_URL + "/profile/password",
        { oldPassword, newPassword },
        { withCredentials: true },
      );
      console.log("Password Change Success: ", res.data);
      setOldPassword("");
      setNewPassword("");
      setIsEditPassword(false);
    } catch (err) {
      console.log(
        "Error During Change Password: ",
        err.response?.data || err.message,
      );
    } finally {
      setIsPasswordChanging(false);
    }
  };

  if (!profileData) {
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4">
        <div className="alert alert-error max-w-md shadow-lg">
          <span>Failed to load profile</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          {isEditing ? (
            /* --- RENDER THE NEW COMPONENT --- */
            <EditProfile
              profileData={profileData}
              setIsEditing={setIsEditing}
            />
          ) : (
            /* --- VIEW MODE UI --- */
            <div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center sm:flex-row sm:space-x-6 sm:space-y-0 sm:text-left">
                <div className="avatar">
                  <div className="w-40 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 shadow-sm">
                    <img
                      src={
                        profileData.photoUrl ||
                        "https://ui-avatars.com/api/?name=" +
                          profileData.firstName +
                          "+" +
                          profileData.lastName
                      }
                      alt={`${profileData.firstName}'s Profile`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {profileData.emailId}
                  </p>
                </div>
              </div>

              <div className="divider mt-8">Personal Information</div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-base-300 bg-base-50 p-4 transition-colors hover:bg-base-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Age
                  </span>
                  <p className="mt-1 text-lg font-medium text-base-content">
                    {profileData.age} Years Old
                  </p>
                </div>
                <div className="rounded-xl border border-base-300 bg-base-50 p-4 transition-colors hover:bg-base-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Gender
                  </span>
                  <p className="mt-1 text-lg font-medium capitalize text-base-content">
                    {profileData.gender}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-outline badge-lg px-4 py-3 text-xs font-bold uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                  {!profileData.skills?.length && (
                    <span className="text-sm text-gray-400">
                      No skills added yet.
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  className="btn btn-outline btn-primary w-full sm:w-auto"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-outline btn-primary w-full sm:w-auto"
                  onClick={() => setIsEditPassword(true)}
                >
                  Change Password
                </button>
                <button
                  className="btn btn-error w-full sm:w-auto"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

          {isEditPassword && (
            <div className="mt-6 border-t border-base-300 pt-6">
              <h2 className="text-2xl font-bold mb-6">Change Password</h2>

              <input
                type="password"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input input-bordered w-full mb-4"
              />

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full mb-4"
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  className="btn btn-ghost w-full sm:w-auto"
                  onClick={() => setIsEditPassword(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={handleChangePassword}
                  disabled={isPasswordChanging}
                >
                  {isPasswordChanging ? "Changing..." : "Change Password"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
