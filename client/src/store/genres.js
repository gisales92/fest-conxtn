// constants
export const SET_GENRES = "genres/SET_GENRES";
export const SET_USER_GENRES = "genres/SET_USER_GENRES";
export const SET_CURRENT_GENRES = "genres/SET_CURRENT_GENRES";

// selectors
export const allGenresSelector = (state) => state.genres.all;
export const userGenresSelector = (state) => state.genres.user;
export const currentGenresSelector = (state) => state.genres.current;

// action creators
// set all genres
export function setAllGenres(genres) {
  return {
    type: SET_GENRES,
    genres,
  };
}
// set genres for a user
export function setUserGenres(genres) {
  return {
    type: SET_USER_GENRES,
    genres,
  };
}
// set genres for current user
export function setCurrentGenres(genres) {
  return {
    type: SET_CURRENT_GENRES,
    genres,
  };
}

// thunks
// fetch all genres thunk
export const getAllGenres = () => async (dispatch) => {
  const res = await fetch("/api/genres");
  const data = res.json();
  dispatch(setAllGenres(data.genres));
  return data;
};
// fetch a user's subscribed genres thunk
export const getUserGenres = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/genres`);
  const data = res.json();
  dispatch(setUserGenres(data.genres));
  return data;
};
// fetch the current user's subscribed genres thunk
export const getCurrentGenres = () => async (dispatch) => {
  const res = await fetch("/my/genres");
  const data = res.json();
  dispatch(setCurrentGenres(data.genres));
  return data;
};

// reducer
export default function genreReducer(
  state = { all: {}, current: {}, user: {} },
  action
) {
  const newState = { ...state };
  newState.all = { ...state.all };
  newState.current = { ...state.current };
  newState.user = { ...state.user };

  switch (action.type) {
    case SET_GENRES:
      const genres = {};
      action.genres.forEach((genre) => {
        genres[genre.id] = genre;
      });
      newState.all = genres;
      break;
    case SET_USER_GENRES:
      const uGenres = {};
      action.genres.forEach((genre) => {
        uGenres[genre.id] = genre;
      });
      newState.user = uGenres;
    case SET_CURRENT_GENRES:
      const cGenres = {};
      action.genres.forEach((genre) => {
        cGenres[genre.id] = genre;
      });
      newState.current = cGenres;
    default:
      break;
  }
  return newState;
}
