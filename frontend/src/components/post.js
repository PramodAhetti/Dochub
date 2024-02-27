import React, { useEffect, useRef } from "react";

const Posts = (props) => {
  return (
    <div className="postbox">
      <sub className="user">{props.post.name}</sub>
      <sub className="message">{" : " + props.post.message}</sub>
    </div>
  );
};

export default Posts;
