import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constents";
import UserCard from "./UserCard";

function EditProfile({ profileData, setIsEditing }) {
  const { _id } = profileData;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const [age, setAge] = useState(profileData.age);
  const [gender, setGender] = useState(profileData.gender);
  const [photoUrl, setPhotoUrl] = useState(profileData.photoUrl);
  const [skills, setSkills] = useState(profileData.skills?.join(", "));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    if (isSaving) return; // Prevent multiple submissions Lock the button
    setIsSaving(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          skills: skills.split(",").map((skill) => skill.trim()), // Convert comma-separated string to array
        },
        { withCredentials: true },
      );

      // Update UI with the new data from the backend response
      const updatedProfile = res.data.data || res.data;
      dispatch(addUser(updatedProfile)); // Update Redux store with new profile data
      setIsEditing(false); // Close edit mode
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setIsSaving(false); // Unlock the button after request completes
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Photo URL Input */}
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text">Photo URL</span>
        </label>
        <input
          type="url"
          name="photoUrl"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="input input-bordered w-full"
          placeholder="https://example.com/your-image.jpg"
        />
      </div>

      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text">Skills (Comma separated)</span>
        </label>
        <input
          type="text"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="input input-bordered w-full"
          placeholder="react, nodejs, mongodb"
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        {error && (
          <p className="text-center text-red-600">
            {error || "Something went wrong !"}
          </p>
        )}
        <button
          type="button"
          className="btn btn-ghost w-full sm:w-auto"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn btn-primary w-full sm:w-auto"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <UserCard
          user={{
            _id: _id,
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            photoUrl: photoUrl,
            skills: skills
              ? skills.split(",").map((skill) => skill.trim())
              : [], // Convert back to array
          }}
        />
      </div>
    </>
  );
}

export default EditProfile;
