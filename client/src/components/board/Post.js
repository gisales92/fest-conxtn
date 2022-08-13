import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postRepliesSelector } from "../../store/replies";
import Reply from "./Reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const EventBoardPost = ({ post }) => {
  const replies = useSelector(postRepliesSelector(post.id));
  const [loaded, setLoaded] = useState(false);
  let replyComponents;
  if (replies) {
    replyComponents = Object.keys(replies).map((key) => {
      return <Reply reply={replies[key]} key={key} />;
    });
  }

  const fixDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "GMT",
    });
  };

  return (
    <div className="post-outer">
      <div className="post-inner">
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
          <p className="post-title">{post.title}</p>
          <p>{post.body}</p>
          <p className="post-date">{fixDate(post.time)}</p>
        </div>
        <div className="post-footer">
          <span>
            <FontAwesomeIcon icon={faCommentDots} />{" "}
            {replies ? Object.keys(replies).length : 0}
          </span>
          <button className="post-reply-button">
            Reply{" "}<FontAwesomeIcon icon={faReply} />
          </button>
        </div>
      </div>
      <div className="reply-container">{replyComponents}</div>
    </div>
  );
};

export default EventBoardPost;
