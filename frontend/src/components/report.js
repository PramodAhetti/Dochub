import React, { useEffect, useState } from "react";
import Near from "./near";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector ,useDispatch} from 'react-redux'
export default function Report() {
  const getdata=async()=>{
   const data=await axios.post('http://localhost:5000/report/myreport');
   console.log(data);  
  }
      
  getdata();
  return (
    <>
      <div className="Title">.GeoPost</div>
      <div className="chatbox">
      </div>
    </>
  );
}
