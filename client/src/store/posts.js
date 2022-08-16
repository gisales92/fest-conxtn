// constants
export const SET_EVENT_POSTS = "posts/SET_EVENT_POSTS";
export const SET_USER_POSTS = "posts/SET_USER_POSTS";
export const SET_CURRENT_POSTS = "posts/SET_CURRENT_POSTS";
export const NEW_POST = "posts/NEW_POST";
export const EDIT_POST = "posts/EDIT_POST";
export const DELETE_POST = "posts/DELETE_POST";
export const FOCUS_POST = "posts/FOCUS_POST";

// selectors
export const eventPostsSelector = (state) => state.posts.event;
export const userPostSelector = (state) => state.posts.user;
export const currentPostSelector = (state) => state.posts.current;
export const focusPostSelector = (state) => state.posts.focus;

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
// new post for an event
export function newPost(post) {
  return {
    type: NEW_POST,
    post,
  };
}
// edit a post
export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  };
}
// delete a post
export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId,
  };
}
// set a post as the focus post
export function focusPost(post) {
  return {
    type: FOCUS_POST,
    post,
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
// create a new post thunk
export const createPost = (post) => async (dispatch) => {
  const { userId, eventId, title, body } = post;
  const res = await fetch(`/api/events/${eventId}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(newPost(data));
    return data;
  }
  return res;
};
// update a post thunk
export const updatePost = (post) => async (dispatch) => {
  const { postId, title, body } = post;
  const res = await fetch(`/api/my/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editPost(data));
    return data;
  }
  return res;
};
// delete post thunk
export const removePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/my/posts/${postId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deletePost(postId));
    return data;
  }
  return res;
};

// reducer
export default function postsReducer(
  state = { event: {}, current: {}, user: {}, focus: {} },
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
    case NEW_POST:
      newState.event[action.post.id] = action.post;
      newState.current[action.post.id] = action.post;
      break;
    case EDIT_POST:
      newState.current[action.post.id] = action.post;
      break;
    case DELETE_POST:
      delete newState.current[action.postId];
      break;
    case FOCUS_POST:
      newState.focus = action.post;
      break;
    default:
      break;
  }
  return newState;
}
