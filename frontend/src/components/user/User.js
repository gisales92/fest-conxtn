import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetchUser, otherUserSelector } from "../../store/user";
import Events from "./Events";
import Genres from "./Genres";
import PostBoard from "./PostBoard";
import Replies from "./Replies";
import "../../styles/userProfile.css";

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
    <div className="user-profile-outer">
      <div className="user-profile-inner">
        <div className="user-profile-upper">
          <img
            src={
              user.profilePicUrl ||
              "https://res.cloudinary.com/djsh50cka/image/upload/v1658974926/avatar-1295397_960_720_bwmkov.png"
            }
            alt="profile-thumb"
            crossOrigin=""
            className="user-profile-img"
          />
          <h1 className="user-profile-name">{user.username}</h1>
        </div>
        <div className="user-profile-lower">
          <Genres />
          <Events />
          <PostBoard />
          <Replies />
        </div>
      </div>
    </div>
  );
}
export default User;
