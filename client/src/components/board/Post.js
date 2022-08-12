import React from "react";

const EventBoardPost = ({ post }) => {
  return (
    <div className="post-outer">
      <div className="post-user-info">
        <p className="post-user-name">{post.user.username}</p>
        <img
          src={
            post.user.profilePicUrl ||
            "https://res.cloudinary.com/djsh50cka/image/upload/v1658974926/avatar-1295397_960_720_bwmkov.png"
          }
          alt="profile-thumb"
          crossOrigin=""
          className="post-user-img"
        />
      </div>
      <div className="post-main">
        <p>{post.title}</p>
        <p>{post.body}</p>
      </div>
      <div className="post-footer">
        <p>{post.time}</p>
      </div>
    </div>
  );
};

export default EventBoardPost;
