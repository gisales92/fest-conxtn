import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as replyActions from "../../store/replies";
import * as postActions from "../../store/posts";
import EventBoardPost from "./Post";
import "../../styles/postReplies.css"

const EventBoard = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(postActions.eventPostsSelector);

  useEffect(() => {
    if (!loaded && Object.keys(posts)[0]) {
      (async () => {
        await Object.keys(posts).forEach(async (postId) => {
          await dispatch(replyActions.getPostReplies(postId));
        });
        setLoaded(true);
      })();
    }
  }, [loaded, dispatch, posts]);

  const postComponents = Object.keys(posts).map((key) => (
    <EventBoardPost key={key} post={posts[key]} />
  ));

  return <div className="event-board-outer">
    {Object.keys(postComponents).length ? postComponents : "Be the first to post for this event"}
  </div>;
};

export default EventBoard;
