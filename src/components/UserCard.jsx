import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constents';
import { removeFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

function UserCard({user}) {
    const {firstName,lastName,photoUrl,age,skills,gender,_id} = user;
    const dispatch = useDispatch();

    const sendRequestStatus = async(status,toUserId)=> {
      try{
       const res = await axios.post(BASE_URL + `/request/send/${status}/${toUserId}`,{}, { withCredentials:true});
        console.log("Request Sent: ", res.data.message);
        dispatch(removeFeed(toUserId));
      }catch(errr){
        console.log("Error in sending request ",errr);
      }
    }


  return (
   <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName || '-'} {lastName || '-'}</h2>
    <p>Age : {age}</p>
    <p>Gender : {gender.toUpperCase() || '-'}</p>
    <p>{skills.join(', ').toUpperCase() || '-'}</p>
    <p></p>
    <div className="card-actions justify-center">
        <button className="btn btn-primary"
        onClick={()=>sendRequestStatus("ignored",_id)}
        >Ingnore
        </button>
      <button className="btn btn-primary"
      onClick={()=>sendRequestStatus("interested",_id)}
      >Send Request</button>
    </div>
  </div>
</div>
  )
}

export default UserCard