import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { getUserPosts } from "../../store/posts";

function Posts() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(getUserPosts(user.id));
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return <div className="user-events-outer">USER POSTS</div>;
}
export default Posts;
