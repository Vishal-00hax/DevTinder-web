import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constents';
import { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

function Feed() {

    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user);
    const feed = useSelector((store)=>store.feed);
    console.log("Feed from Store: ", feed);

    const fetchFeed = async () => {

        try{
        const res = await axios.get(BASE_URL + "/user/feed",{ withCredentials:true});
        dispatch(addFeed(res.data.data));
        console.log("Feed Data Fetched: ", res.data.data);
        }catch(err){
            console.log("Error Fetching Feed: ", err.response?.data || err.message);
        }
    }

    useEffect(()=>{
        fetchFeed();
    },[]);



  return (

    <div >
        Feed Page  
    </div>
  )
}

export default Feed