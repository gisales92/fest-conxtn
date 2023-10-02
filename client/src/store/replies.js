// constants
export const SET_POST_REPLIES = "replies/SET_POST_REPLIES";
export const SET_USER_REPLIES = "replies/SET_USER_REPLIES";
export const SET_CURRENT_REPLIES = "replies/SET_CURRENT_REPLIES";
export const NEW_REPLY = "replies/NEW_REPLY";
export const EDIT_REPLY = "replies/EDIT_REPLY";
export const DELETE_REPLY = "replies/DELETE_REPLY";
export const FOCUS_REPLY = "replies/FOCUS_REPLY";

// selectors
export const postRepliesSelector = (postId) => (state) =>
  state.replies.posts[postId];
export const userRepliesSelector = (state) => state.replies.user;
export const currentRepliesSelector = (state) => state.replies.current;
export const focusReplySelector = (state) => state.replies.focus;

// action creators
// set all replies for a post
export function setPostReplies(replies, postId) {
  return {
    type: SET_POST_REPLIES,
    replies,
    postId,
  };
}
// set all replies made by a user
export function setUserReplies(replies) {
  return {
    type: SET_USER_REPLIES,
    replies,
  };
}
// set all replies made by current user
export function setCurrentReplies(replies) {
  return {
    type: SET_CURRENT_REPLIES,
    replies,
  };
}
// new reply for a post
export function newReply(reply) {
  return {
    type: NEW_REPLY,
    reply,
  };
}
// edit a reply
export function editReply(reply) {
  return {
    type: EDIT_REPLY,
    reply,
  };
}
// delete a reply
export function deleteReply(reply) {
  return {
    type: DELETE_REPLY,
    reply,
  };
}
// set a reply as the focused reply
export function focusReply(reply) {
  return {
    type: FOCUS_REPLY,
    reply,
  };
}

// thunks
// fetch all replies to a post thunk
export const getPostReplies = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/replies`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setPostReplies(data.replies, postId));
    return data;
  }
  return res;
};
// fetch all of a user's replies thunk
export const getUserReplies = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/replies`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setUserReplies(data.replies));
    return data;
  }
  return res;
};
// fetch the current user's replies thunk
export const getCurrentReplies = () => async (dispatch) => {
  const res = await fetch("/api/my/replies");
  if (res.ok) {
    const data = await res.json();
    dispatch(setCurrentReplies(data.replies));
    return data;
  }
  return res;
};
// create a new reply thunk
export const createReply = (reply) => async (dispatch) => {
  const { userId, postId, body } = reply;
  const res = await fetch(`/api/posts/${postId}/replies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(newReply(data));
    return data;
  }
  return res;
};
// edit a reply thunk
export const updateReply = (reply) => async (dispatch) => {
  const { replyId, body } = reply;
  const res = await fetch(`/api/my/replies/${replyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editReply(data));
    return data;
  }
  return res;
};
// delete reply thunk
export const removeReply = (reply) => async (dispatch) => {
  const res = await fetch(`/api/my/replies/${reply.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteReply(reply));
    return data;
  }
  return res;
};

// reducer
export default function repliesReducer(
  state = { posts: {}, current: {}, user: {}, focus: {} },
  action
) {
  const newState = {};
  newState.posts = { ...state.posts };
  newState.current = { ...state.current };
  newState.user = { ...state.user };

  switch (action.type) {
    case SET_POST_REPLIES:
      const pReps = {};
      const postId = action.postId;
      action.replies.forEach((reply) => {
        pReps[reply.id] = reply;
      });
      newState.posts[postId] = pReps;
      break;
    case SET_USER_REPLIES:
      const uReps = {};
      action.replies.forEach((reply) => {
        uReps[reply.id] = reply;
      });
      newState.user = uReps;
      break;
    case SET_CURRENT_REPLIES:
      const cReps = {};
      action.replies.forEach((reply) => {
        cReps[reply.id] = reply;
      });
      newState.current = cReps;
      break;
    case NEW_REPLY:
      if (newState.posts[action.reply.post.id]) {
        newState.posts[action.reply.post.id][action.reply.id] = action.reply;
      } else {
        newState.posts[action.reply.post.id] = {
          [action.reply.id]: action.reply,
        };
      }
      newState.current[action.reply.id] = action.reply;
      break;
    case EDIT_REPLY:
      newState.current[action.reply.id] = action.reply;
      if (action.reply.post && newState.posts[action.reply.post.id]) {
        newState.posts[action.reply.post.id][action.reply.id] = action.reply;
      } else if (action.reply.postId && newState.posts[action.reply.postId]) {
        newState.posts[action.reply.postId][action.reply.id] = action.reply;
      }
      break;
    case DELETE_REPLY:
      delete newState.current[action.reply.id];
      if (action.reply.post && newState.posts[action.reply.post.id]) {
        delete newState.posts[action.reply.post.id][action.reply.id];
      } else if (action.reply.postId && newState.posts[action.reply.postId]) {
        delete newState.posts[action.reply.postId][action.reply.id];
      }
      break;
    case FOCUS_REPLY:
      newState.focus = action.reply;
      break;
    default:
      break;
  }
  return newState;
}
