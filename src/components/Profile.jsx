import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
 
function Profile() {
  const [profileData , setProfileData] = useState(null);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null)

  useEffect(()=>{
      const fetchProfileData = async () => {
    try{
      const res = await axios.get("http://localhost:7777/profile/view", { withCredentials: true});
      setProfileData(res.data);
    }catch(err){
      console.log("Error:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    }finally{
      setLoading(false);
    }
  };
  fetchProfileData();
  },[])

  const handleLogout = async () => {
    try{
      const res = await axios.post("http://localhost:7777/logout", {} , { withCredentials:true } )
    }catch(err){
      console.log("LogOut Erorr: ", err.respoinse?.data || err.messagre);
    }
  }
 
  if(loading){
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if(error || !profileData){
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4">
        <div className="alert alert-error max-w-md shadow-lg">
          <span>{error || "Failed to load profile"}</span>
        </div>
      </div>
    );
  }


  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center sm:flex-row sm:space-x-6 sm:space-y-0 sm:text-left">
            <div className="avatar">
              <div className="w-40 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 shadow-sm">
  <img 
    src={profileData.photoUrl || "https://ui-avatars.com/api/?name=" + profileData.firstName + "+" + profileData.lastName} 
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

          {/* Details Grid */}
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

          {/* Skills Section */}
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
                <span className="text-sm text-gray-400">No skills added yet.</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button className="btn btn-outline btn-primary w-full sm:w-auto">
              Edit Profile
            </button>
            <button className="btn btn-error w-full sm:w-auto" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Profile