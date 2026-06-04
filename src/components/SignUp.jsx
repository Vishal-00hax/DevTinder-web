import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constents";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    photoUrl: "",
    age: "",
    phone: "",
    gender: "",
    skills: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailId: formData.emailId,
      password: formData.password,
      photoUrl: formData.photoUrl,
      age: formData.age ? Number(formData.age) : undefined,
      phone: formData.phone,
      gender: formData.gender,
      skills: formData.skills
        ? formData.skills.split(",").map((skill) => skill.trim())
        : [],
    };
    try {
      const res = await axios.post(BASE_URL + "/signup", payload, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-sm text-gray-500">Join us to get started</p>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-3">
            {/* Two-column grid for first/last name on desktop */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">First Name *</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="John"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Last Name *</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email *</span>
              </label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password *</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Two-column for age & phone */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="25"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Gender</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full font-normal text-gray-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Skills */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Skills (comma-separated)
                </span>
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="React, Node.js, Tailwind"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-center text-red-600 mt-2 font-medium">
                {error || "Something went wrong"}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-4"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Saving...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer font-semibold text-primary hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
