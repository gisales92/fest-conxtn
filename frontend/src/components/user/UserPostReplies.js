import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/user";

const UserPostReply = ({ reply }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fixDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "GMT",
    });
  };

  const redirectToUser = async (e) => {
    e.stopPropagation();
    await dispatch(fetchUser(reply.user.username));
    history.push(`/users/${reply.user.username}`);
  };

  return (
    <div className="reply-outer">
      <div className="reply-user-info" onClick={redirectToUser}>
        <img
          src={
            reply.user.profilePicUrl ||
            "https://res.cloudinary.com/djsh50cka/image/upload/v1658974926/avatar-1295397_960_720_bwmkov.png"
          }
          alt="profile-thumb"
          crossOrigin=""
          className="reply-user-img"
        />
        <p className="reply-user-name">{reply.user.username}</p>
      </div>
      <div className="reply-main">
        <p>{reply.body}</p>
      </div>
      <div className="reply-footer">
        <p>{fixDate(reply.time)}</p>
      </div>
    </div>
  );
};

export default UserPostReply;
