// constants
export const SET_EVENT_POSTS = "posts/SET_EVENT_POSTS";
export const SET_USER_POSTS = "posts/SET_USER_POSTS";
export const SET_CURRENT_POSTS = "posts/SET_CURRENT_POSTS";

// selectors
export const eventPostsSelector = (state) => state.posts.event;
export const userPostSelector = (state) => state.posts.current;
export const currentPostSelector = (state) => state.posts.user;

// action creators
// set all posts for an event
export function setEventPosts(posts) {
  return {
    type: SET_EVENT_POSTS,
    posts,
  };
}
// set all posts for a user
export function setUserPosts(posts) {
  return {
    type: SET_USER_POSTS,
    posts,
  };
}
// set current user's posts
export function setCurrentPosts(posts) {
  return {
    type: SET_CURRENT_POSTS,
    posts,
  };
}

// thunks
// fetch an event's posts thunk
export const getEventPosts = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}/posts`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setEventPosts(data.posts));
    return data;
  }
  return res;
};
// fetch a user's posts thunk
export const getUserPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/posts`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setUserPosts(data.posts));
    return data;
  }
  return res;
};
// fetch the current users's posts thunk
export const getCurrentPosts = () => async (dispatch) => {
  const res = await fetch("/api/my/posts");
  if (res.ok) {
    const data = await res.json();
    dispatch(setCurrentPosts(data.posts));
    return data;
  }
  return res;
};

// reducer
export default function postsReducer(
  state = { event: {}, current: {}, user: {} },
  action
) {
  const newState = { ...state };
  newState.event = { ...state.event };
  newState.current = { ...state.current };
  newState.user = { ...state.user };

  switch (action.type) {
    case SET_EVENT_POSTS:
      const ePosts = {};
      action.posts.forEach((post) => {
        ePosts[post.id] = post;
      });
      newState.event = ePosts;
      break;
    case SET_USER_POSTS:
      const uPosts = {};
      action.posts.forEach((post) => {
        uPosts[post.id] = post;
      });
      newState.user = uPosts;
      break;
    case SET_CURRENT_POSTS:
      const cPosts = {};
      action.posts.forEach((post) => {
        cPosts[post.id] = post;
      });
      newState.current = cPosts;
      break;
    default:
      break;
  }
  return newState;
}
