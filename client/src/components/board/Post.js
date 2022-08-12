import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postRepliesSelector } from "../../store/replies";
import Reply from "./Reply";

const EventBoardPost = ({ post }) => {
  const replies = useSelector(postRepliesSelector(post.id));
  const [loaded, setLoaded] = useState(false);
  let replyComponents;
  if (replies) {
    replyComponents = Object.keys(replies).map((key) => {
      return <Reply reply={replies[key]} key={key} />;
    });
  }

  return (
    <div className="post-outer">
      <div className="post-user-info">
        <img
          src={
            post.user.profilePicUrl ||
            "https://res.cloudinary.com/djsh50cka/image/upload/v1658974926/avatar-1295397_960_720_bwmkov.png"
          }
          alt="profile-thumb"
          crossOrigin=""
          className="post-user-img"
        />
        <p className="post-user-name">{post.user.username}</p>
      </div>
      <div className="post-main">
        <p>{post.title}</p>
        <p>{post.body}</p>
      </div>
      <div className="post-footer">
        <p>{post.time}</p>
        <p>Replies: {replies ? Object.keys(replies).length : 0}</p>
      </div>
      <div className="reply-container">{replyComponents}</div>
    </div>
  );
};

export default EventBoardPost;
