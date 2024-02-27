import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendurl from "./backend";

export default function Newpost() {
  const navigate = useNavigate();

  const Post = async () => {
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const message = document.getElementById("message").value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);
    formData.append("token",localStorage.getItem('token'));
    formData.append("clientId",'65daf8966a50de5cce4382d4')

    try {
      const response = await axios.post(`${backendurl}/report/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)

      if (response.status === 200) {
        alert("Posted");
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  };

  return (
    <>
      <div className="Title">.GeoPost</div>
      <div className="NewBox debug">
        <br />
        <br />
        <input
          className="LoginInput postmessage"
          id="message"
          placeholder="Type your post"
        />
        <br />
        <input type="file" id="file" />
        <br />
        <button className="LoginButton" onClick={Post}>
          Submit
        </button>
        <br />
      </div>
    </>
  );
}
