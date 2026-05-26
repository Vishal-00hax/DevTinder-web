import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {

  try {
    console.log({emailId,password,});
    const res = await axios.post("http://localhost:7777/login",
      {
        emailId,
        password,
      },
      { withCredentials: true },
      navigate("/")
    );
    console.log("SUCCESS:", res.data);
  } catch (err) {

    console.log("BACKEND ERROR:",err.response?.data || err.message);

  }
};
  return (
 <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl"> 
        <div className="card-body">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Login to continue to your account
            </p>
          </div>
          {/* Email */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          {/* Password */}
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text font-medium">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <button className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          {/* Login Button */}
          <button className="btn btn-primary w-full" onClick={handleLogin}>
            Login
          </button>
          {/* Divider */}
          <div className="divider">OR</div>
          {/* Signup */}
          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span className="cursor-pointer font-semibold text-primary hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login