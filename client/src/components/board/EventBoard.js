import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as replyActions from "../../store/replies";
import * as postActions from "../../store/posts";

const EventBoard = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(postActions.eventPostsSelector);

  useEffect(() => {
    if (!loaded && Object.keys(posts)[0]) {
      (async () => {
        console.log(posts);
        await Object.keys(posts).forEach(async (postId) => {
          await dispatch(replyActions.getPostReplies(postId));
        });
        setLoaded(true);
      })();
    }
  }, [loaded, dispatch, posts]);

  return <div className="event-board-outer">EVENT BOARD COMPONENT</div>;
};

export default EventBoard;
