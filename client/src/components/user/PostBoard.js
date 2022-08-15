import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { otherUserSelector } from "../../store/user";
import { getUserPosts, userPostSelector } from "../../store/posts";
import { getPostReplies } from "../../store/replies";

function PostBoard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const user = useSelector(otherUserSelector);
  const posts = useSelector(userPostSelector);

  useEffect(() => {
    if ((!loaded && user.id) || ((user.id !== userId) && user.id)) {
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
    if (!loaded && Object.keys(posts)[0]) {
      (async () => {
        await Object.keys(posts).forEach(async (postId) => {
          await dispatch(getPostReplies(postId));
        });
        setLoaded(true);
      })();
    }
  }, [loaded, dispatch, posts]);

  const fixDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "GMT",
    });
  };

  return <div className="user-posts-outer"><h2 className="user-posts-header">{`${user.username}'s Posts`}</h2></div>;
}
export default PostBoard;
