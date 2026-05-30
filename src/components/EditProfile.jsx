import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constents';

function EditProfile({profileData , setIsEditing}) {
    const dispatch = useDispatch();
    const [isSaving , setIsSaving] = useState(false);
    const [error , setError] = useState("");

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
        setError(err.response?.data || err.message); 
      console.log("Error During Edit Profile: ", err.response?.data || err.message); 
    }finally{
      setIsSaving(false); // Unlock the button after request completes
    }
    };

  return (
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
                {error && <p className='text-center text-red-600'>Something went wrong !</p>}
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
  )
}

export default EditProfile