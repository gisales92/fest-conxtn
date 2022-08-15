import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { focusReply, removeReply } from "../../store/replies";
import { showModal } from "../../store/ui";
import { EDIT_REPLY_MODAL } from "../modals/EditReplyModal";

const Reply = ({ reply }) => {
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

  const redirectToEvent = (e) => {
    e.stopPropagation();
    history.push(`/events/${reply.post.Event.url}`);
  };

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
    <div className="reply-outer user">
      <div className="user-reply-upper">
        <h4 className="user-reply-info">
          Replying to <em>{reply.post.title}</em> on{" "}
          <span className="user-reply event-name" onClick={redirectToEvent}>
            {reply.post.Event.name}'s Festival Board
          </span>
        </h4>
      </div>
      <div className="user-reply-main">
        <p>{reply.body}</p>
      </div>
      <div className="reply-footer">
        <p>{fixDate(reply.time)}</p>
      </div>
      <div className="reply-actions">
      <span className="post-action" onClick={handleEditClick}><FontAwesomeIcon icon={faPen} />{" "}Edit Reply</span>
          <span className="post-action" onClick={handleDeleteClick}><FontAwesomeIcon icon={faXmark} />{" "}Delete Reply</span>
      </div>
    </div>
  );
};

export default Reply;
