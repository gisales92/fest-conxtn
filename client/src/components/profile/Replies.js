import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentRepliesSelector } from "../../store/replies";
import Reply from "./Reply";

function Replies() {

  const replies = useSelector(currentRepliesSelector);

  let replyComponents;
  if (replies) {
    replyComponents = Object.keys(replies).map((key) => {
      return <Reply reply={replies[key]} key={key} />;
    });
  }

  return (
    <div className="user-replies-outer">
      <h2 className="user-replies-header">Your Replies</h2>
      {replyComponents ? (
        <div className="user-replies-inner">{replyComponents}</div>
      ) : null}
    </div>
  );
}
export default Replies;
