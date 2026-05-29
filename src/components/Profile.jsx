import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constents';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';

function Profile() {
const profileData = useSelector(store => store.user);
  console.log("User from NavBar:", profileData); 

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving , setIsSaving] = useState(false);
  const [isEditPassword , setIsEditPassword] = useState(false);
  const [oldPassword , setOldPassword] = useState("");
  const [newPassword , setNewPassword] = useState("");
  const [isPasswordChanging , setIsPasswordChanging] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL+"/logout", {}, { withCredentials: true });
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.log("LogOut Error: ", err.response?.data || err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); 
    if(isSaving) return; // Prevent multiple submissions Lock the button
    setIsSaving(true);
    // This line looks at the entire HTML <form> element (e.target)
    const formData = new FormData(e.target);
    // This turns everything inside the form into a neat JavaScript object
    const formValues = Object.fromEntries(formData.entries());

    // 2. Format the payload precisely to match backend requirements
    const payload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      age: parseInt(formValues.age, 10) || 0, // Ensure integer
      gender: formValues.gender,
      photoUrl: formValues.photoUrl || "", 
      // Convert comma-separated string back to an array
      skills: formValues.skills ? formValues.skills.split(',').map(s => s.trim()).filter(Boolean) : [] 
    };

    try {
      const res = await axios.patch(BASE_URL+"/profile/edit", payload, { withCredentials: true });
      
      // Update UI with the new data from the backend response
      const updatedProfile = res.data.data || res.data;
      dispatch(addUser(updatedProfile)); // Update Redux store with new profile data
      setIsEditing(false); // Close edit mode
    } catch (err) {
      console.log("Error During Edit Profile: ", err.response?.data || err.message); 
    }finally{
      setIsSaving(false); // Unlock the button after request completes
    }
  };

  const handleChangePassword = async () => {
    try{
      if(isPasswordChanging) return; // Prevent double clicking
      setIsPasswordChanging(true);
      const res = await axios.patch(BASE_URL+"/profile/password",{oldPassword,newPassword}, {withCredentials: true});
      console.log("Password Change Success: ", res.data);
      setOldPassword("");
      setNewPassword("");
      setIsEditPassword(false);
    }catch(err){
      console.log("Error During Change Password: ", err.response?.data || err.message);
    }finally{
      setIsPasswordChanging(false);
    }
  }



  if (!profileData) {
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4">
        <div className="alert alert-error max-w-md shadow-lg">
          <span>{"Failed to load profile"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          
          {isEditing ? (
            /* EDIT MODE UI */
            <form onSubmit={handleSave}>
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text">First Name</span></label>
                  <input type="text" name="firstName" defaultValue={profileData.firstName} className="input input-bordered w-full" />
                </div>
                
                <div className="form-control w-full">
                  <label className="label"><span className="label-text">Last Name</span></label>
                  <input type="text" name="lastName" defaultValue={profileData.lastName} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className="label-text">Age</span></label>
                  <input type="number" name="age" defaultValue={profileData.age} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className="label-text">Gender</span></label>
                  <select name="gender" defaultValue={profileData.gender} className="select select-bordered w-full">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Photo URL Input */}
              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Photo URL</span></label>
                <input 
                  type="url" 
                  name="photoUrl" 
                  defaultValue={profileData.photoUrl} 
                  className="input input-bordered w-full" 
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label"><span className="label-text">Skills (Comma separated)</span></label>
                <input 
                  type="text" 
                  name="skills" 
                  defaultValue={profileData.skills?.join(', ')} 
                  className="input input-bordered w-full" 
                  placeholder="react, nodejs, mongodb"
                />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" 
                disabled={isSaving}
                className="btn btn-primary w-full sm:w-auto">
                 {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            /* --- VIEW MODE UI --- */
            <div>
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-base-300 bg-base-50 p-4 transition-colors hover:bg-base-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Age</span>
                  <p className="mt-1 text-lg font-medium text-base-content">{profileData.age} Years Old</p>
                </div>
                <div className="rounded-xl border border-base-300 bg-base-50 p-4 transition-colors hover:bg-base-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Gender</span>
                  <p className="mt-1 text-lg font-medium capitalize text-base-content">{profileData.gender}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills?.map((skill, index) => (
                    <span key={index} className="badge badge-primary badge-outline badge-lg px-4 py-3 text-xs font-bold uppercase">
                      {skill}
                    </span>
                  ))}
                  {!profileData.skills?.length && (
                    <span className="text-sm text-gray-400">No skills added yet.</span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button className="btn btn-outline btn-primary w-full sm:w-auto" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                  <button className="btn btn-outline btn-primary w-full sm:w-auto" onClick={() => setIsEditPassword(true)}>
                  Change Password
                </button>
                 <button className="btn btn-error w-full sm:w-auto" onClick={handleLogout}>
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
      <button className="btn btn-ghost w-full sm:w-auto" onClick={() => setIsEditPassword(false)}>
        Cancel
      </button>
      <button className="btn btn-primary w-full sm:w-auto" 
      onClick={handleChangePassword}
      disabled={isPasswordChanging}
      >
       {isPasswordChanging ? 'Changing...' : 'Change Password'}
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