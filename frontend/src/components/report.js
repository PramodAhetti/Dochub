import React, { useEffect, useState } from "react";
import PdfViewer from "./pdfviewer";
import { useNavigate } from "react-router-dom";
import Near from "./near";
import axios from "axios";
export default function Report() {
    const navigate=useNavigate();
    const [report,setreports]=useState([]);
    let data;
    useEffect(()=>{
      const fetchData = async () => {
        try {
          console.log(localStorage.getItem('token'));
          let response = await axios.post("http://localhost:5000/report/myreport",{token:localStorage.getItem('token')});
          console.log(response.data.data)  
          setreports(response.data.data);
        } catch (error) {
          console.log(error);
          navigate("/login");
        }
      };

  fetchData(); 
    },[]);

  return (
    <>
      <div className="Title">.GeoPost</div>
      <div className="chatbox">
        {
          report.map((data)=>(
              <Near key={data._id} props={data} />
          ))
        }
      </div>
    </>
  );
}