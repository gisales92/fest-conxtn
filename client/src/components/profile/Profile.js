import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/session";
import { fetchCurrentEvents } from "../../store/events";
import { getCurrentGenres } from "../../store/genres";
import { getCurrentPosts } from "../../store/posts";
import { getCurrentReplies } from "../../store/replies";
import Events from "./Events";
import Genres from "./Genres";
import PostBoard from "./PostBoard";
import Replies from "./Replies";
import "../../styles/userProfile.css";

function Profile() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(fetchCurrentEvents());
          await dispatch(getCurrentGenres());
          await dispatch(getCurrentPosts());
          await dispatch(getCurrentReplies());
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return (
    <div className="user-profile-outer">
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
  );
}
export default Profile;
