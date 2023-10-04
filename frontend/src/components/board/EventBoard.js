import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as replyActions from "../../store/replies";
import * as postActions from "../../store/posts";
import EventBoardPost from "./Post";
import "../../styles/postReplies.css"

const EventBoard = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postActions.eventPostsSelector);
  const postReplies = useSelector(state => state.replies?.posts);

  useEffect(() => {
    // fetching replies if we're missing any post Ids as keys in our "replies: posts" slice of state
    const postIds = Object.keys(posts)
    const postReplyIds = Object.keys(postReplies)
    if (!postIds.every((postId)  => postReplyIds.includes(postId))) {
      (async () => {
        await Object.keys(posts).forEach(async (postId) => {
          await dispatch(replyActions.getPostReplies(postId));
        });

      })();
    }
  }, [posts, dispatch, postReplies]);

  // sorting the posts with the most recent first when we go to map the components
  const postComponents = Object.keys(posts).map((key) => (
    <EventBoardPost key={key} post={posts[key]} />
  )).sort((a, b) => a.props.post.time > b.props.post.time ? -1 : 1);

  return <div className="event-board-outer">
    {Object.keys(postComponents).length ? postComponents : "Be the first to post for this event"}
  </div>;
};

export default EventBoard;
