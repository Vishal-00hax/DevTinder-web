import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constents';

function useLogout() {

    const dispatch = useDispatch();
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
  return (
    handleLogout
  )
}

export default useLogout;