import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRepliesSelector } from "../../store/replies";
import UserPostReply from "./UserPostReplies";
import { NEW_REPLY_MODAL } from "../modals/NewReplyModal";
import { focusPost } from "../../store/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faCommentDots,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { showModal } from "../../store/ui";

const UserPost = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const replies = useSelector(postRepliesSelector(post.id));
  const [showReplies, setShowReplies] = useState(false);
  let replyComponents;
  if (replies) {
    replyComponents = Object.keys(replies).map((key) => {
      return <UserPostReply reply={replies[key]} key={key} />;
    }).sort((a, b) => a.props.reply.time > b.props.reply.time ? -1 : 1);
  }

  const fixDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "GMT",
    });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!showReplies) {
      setShowReplies(true);
    } else {
      setShowReplies(false);
    }
  };

  const handleReplyModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(focusPost(post));
    dispatch(showModal(NEW_REPLY_MODAL));
  };

  const redirectToEvent = (e) => {
    e.stopPropagation();
    history.push(`/events/${post.event.url}`);
  };

  return (
    <div className="post-outer">
      <div className="post-inner">
        <div className="user-post-upper">
          <div className="post-event-info" onClick={redirectToEvent}>
            <img
              src={post.event.mainPicUrl}
              alt="profile-thumb"
              crossOrigin=""
              className="post-event-img"
            />
            <p className="post-event-name">{post.event.name}</p>
          </div>
        </div>
        <div className="post-main">
          <p className="post-title">{post.title}</p>
          <p className="post-body">{post.body}</p>
          <p className="post-date">{fixDate(post.time)}</p>
        </div>
        <div className="post-footer">
          <span>
            <FontAwesomeIcon icon={faCommentDots} />{" "}
            {replies ? Object.keys(replies).length : 0}
          </span>
          <button className="post-reply-button" onClick={handleReplyModal}>
            Reply <FontAwesomeIcon icon={faReply} />
          </button>
        </div>
      </div>
      <div className="reply-container">
        {showReplies ? (
          <div className="reply-controller active" onClick={handleClick}>
            {replyComponents}
            <div className="reply-controller-bar">
              <FontAwesomeIcon icon={faArrowUp} /> Click to hide
            </div>
          </div>
        ) : (
          <div>
            {replies ? (
              Object.keys(replies).length ? (
                <div className="reply-controller hidden" onClick={handleClick}>
                  <FontAwesomeIcon icon={faArrowDown} /> Click to expand{" "}
                </div>
              ) : (
                <div className="no-replies">Be the first to reply</div>
              )
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPost;
