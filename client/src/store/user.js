// constants
export const SET_USER = "users/SET_USER";

// selectors
export const userSelector = (state) => state.user;

// action creators
// set the user
export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

// thunks
// fetch a user thunk
export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
    return data;
  }
  return res;
};

// reducer
export default function userReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState = action.user;
      break;
    default:
      break;
  }
  return newState;
}
