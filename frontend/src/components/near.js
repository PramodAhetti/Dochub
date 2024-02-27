import React, { useEffect, useRef } from "react";

const Near = (props) => {
const dateString = props.post.date;
const timestamp = parseInt(dateString, 10);
const now = new Date(timestamp);
const hours = now.getHours().toString().padStart(2, '0'); // Add leading zero if needed
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');
const formattedTime = `${hours}:${minutes}:${seconds}`;
  return (
    <div className="postbox">
            
      <sub className="user">{props.post.name}</sub>
      <sub className="message">{" : " + props.post.message}<sub className="date">{formattedTime}</sub></sub>

    </div>
  );
};

export default Near;