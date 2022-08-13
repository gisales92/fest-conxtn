import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { getUserGenres } from "../../store/genres";

function Genres() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(getUserGenres(user.id));
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return <div className="user-events-outer">USER GENRES</div>;
}
export default Genres;
