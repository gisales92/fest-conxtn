// constants
export const SET_POST_REPLIES = "replies/SET_POST_REPLIES";
export const SET_USER_REPLIES = "replies/SET_USER_REPLIES";
export const SET_CURRENT_REPLIES = "replies/SET_CURRENT_REPLIES";

// selectors
export const postRepliesSelector = (postId) => (state) =>
  state.replies.posts[postId];
export const userRepliesSelector = (state) => state.replies.user;
export const currentRepliesSelector = (state) => state.replies.current;

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

// reducer
export default function repliesReducer(
  state = { posts: {}, current: {}, user: {} },
  action
) {
  const newState = { ...state };
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
    default:
      break;
  }
  return newState;
}
