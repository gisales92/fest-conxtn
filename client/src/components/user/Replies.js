import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { getUserReplies, userRepliesSelector } from "../../store/replies";
import Reply from "./Reply";

function Replies() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const user = useSelector(otherUserSelector);
  const replies = useSelector(userRepliesSelector);

  let replyComponents;
  if (replies) {
    replyComponents = Object.keys(replies).map((key) => {
      return <Reply reply={replies[key]} key={key} />;
    });
  }

  useEffect(() => {
    if ((!loaded && user.id) || (user.id !== userId && user.id)) {
      (async () => {
        try {
          await dispatch(getUserReplies(user.id));
        } finally {
          setLoaded(true);
          setUserId(user.id)
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return <div className="user-events-outer">{replyComponents}</div>;
}
export default Replies;
