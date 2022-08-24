import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import { userSelector } from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { focusReply, removeReply } from "../../store/replies";
import { showModal } from "../../store/ui";
import { EDIT_REPLY_MODAL } from "../modals/EditReplyModal";

const Reply = ({ reply }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
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
    history.push(`/users/${reply.user.username}`)
  }

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(focusReply(reply));
    dispatch(showModal(EDIT_REPLY_MODAL));
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeReply(reply.id));
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
      {user.id && reply.user.id === user.id && <div className="reply-actions">
      <span className="post-action" onClick={handleEditClick}><FontAwesomeIcon icon={faPen} />{" "}Edit Reply</span>
          <span className="post-action" onClick={handleDeleteClick}><FontAwesomeIcon icon={faXmark} />{" "}Delete Reply</span>
      </div>}
    </div>
  );
};

export default Reply;
