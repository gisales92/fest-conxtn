import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetchUser, otherUserSelector } from "../../store/user";
import Events from "./Events";
import Genres from "./Genres";
import Posts from "./Posts";
import Replies from "./Replies";

function User() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const match = useRouteMatch({
    path: "/users/:username",
    exact: true,
  });
  const username = match.params.username;
  const user = useSelector(otherUserSelector);

  useEffect(() => {
    if (!loaded && username) {
      (async () => {
        try {
          await dispatch(fetchUser(username));
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, username]);

  return (
    <>
      <strong>Username:</strong> {user.username}
      <br />
      <strong>Email:</strong> {user.email}
      <br />
      <hr />
      <Events />
      <Genres />
      <Posts />
      <Replies />
    </>
  );
}
export default User;
