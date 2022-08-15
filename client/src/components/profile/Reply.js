import React from "react";
import { useHistory } from "react-router-dom";

const Reply = ({ reply }) => {
  const history = useHistory();
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

  return (
    <div className="reply-outer user">
      <div className="user-reply-upper">
        <h4 className="user-reply-info">
          Replying to{" "}
          <em>{reply.post.title}</em> on{" "}
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
    </div>
  );
};

export default Reply;
