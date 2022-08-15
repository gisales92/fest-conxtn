import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { getUserPosts, userPostSelector } from "../../store/posts";
import { getPostReplies } from "../../store/replies";
import UserPost from "./UserPost";

function PostBoard() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [userId, setUserId] = useState("");
  const user = useSelector(otherUserSelector);
  const posts = useSelector(userPostSelector);

  useEffect(() => {
    if ((!loaded && user.id) || (user.id !== userId && user.id)) {
      (async () => {
        try {
          await dispatch(getUserPosts(user.id));
        } finally {
          setLoaded(true);
          setUserId(user.id);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  useEffect(() => {
    if (!updated && Object.keys(posts)[0]) {
      (async () => {
        await Object.keys(posts).forEach(async (postId) => {
          await dispatch(getPostReplies(postId));
        });
        setUpdated(true);
      })();
    }
  }, [updated, dispatch, posts]);

  const postComponents = Object.keys(posts)
    .map((key) => <UserPost key={key} post={posts[key]} />)
    .sort((a, b) => (a.props.post.time > b.props.post.time ? -1 : 1));


  return (
    <div className="user-posts-outer">
      <h2 className="user-posts-header">{`${user.username}'s Posts`}</h2>
      { postComponents ? <div className="user-post-inner">{postComponents}</div> : <p>This user has not posted</p>}
    </div>
  );
}
export default PostBoard;
