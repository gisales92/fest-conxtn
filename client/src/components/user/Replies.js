import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { getUserReplies } from "../../store/replies";

function Replies() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(getUserReplies(user.id));
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return <div className="user-events-outer">USER REPLIES</div>;
}
export default Replies;
