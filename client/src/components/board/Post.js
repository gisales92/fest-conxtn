import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRepliesSelector } from "../../store/replies";
import Reply from "./Reply";
import { EDIT_POST_MODAL } from "../modals/EditPostModal";
import { NEW_REPLY_MODAL } from "../modals/NewReplyModal";
import { focusPost, removePost } from "../../store/posts";
import { userSelector } from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faCommentDots,
  faArrowDown,
  faArrowUp,
  faXmark,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { showModal } from "../../store/ui";

const EventBoardPost = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSelector);
  const replies = useSelector(postRepliesSelector(post.id));
  const [showReplies, setShowReplies] = useState(false);
  let replyComponents;
  if (replies) {
    replyComponents = Object.keys(replies)
      .map((key) => {
        return <Reply reply={replies[key]} key={key} />;
      })
      .sort((a, b) => (a.props.reply.time < b.props.reply.time ? -1 : 1));
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
    setShowReplies(!showReplies)
  };

  const handleReplyModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(focusPost(post));
    dispatch(showModal(NEW_REPLY_MODAL));
  };

  const redirectToUser = (e) => {
    e.stopPropagation();
    history.push(`/users/${post.user.username}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(focusPost(post));
    dispatch(showModal(EDIT_POST_MODAL));
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removePost(post.id));
  };

  return (
    <div className="post-outer">
      <div className="post-inner">
        <div className="event-post-upper">
        <div className="post-user-info" onClick={redirectToUser}>
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
         { user && user.id && user.id === post.user.id && <div className="profile-post-actions">
            <span className="post-action" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faPen} /> Edit Post
            </span>
            <span className="post-action" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faXmark} /> Delete Post
            </span>
          </div>}
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

export default EventBoardPost;
