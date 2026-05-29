import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from './utils/constents';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const fetchUser = async () => {
    try{
      if(user) return;
      const res = await axios.get(BASE_URL+"/profile/view",{ withCredentials:true });
      dispatch(addUser(res.data));
      console.log("User Data Fetched:", res.data);
    }catch(err){
      if(err.response && err.response.status === 401){navigate("/login")}
          console.log(err);
    }
  };

  useEffect(()=>{
    
      fetchUser();
    
  },[]);

  return (
   <div>
    
      <NavBar />
      <Outlet />
      <Footer />
   
   </div>
  );
};

export default Body;