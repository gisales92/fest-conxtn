// constants
export const SET_GENRES = "genres/SET_GENRES";
export const SET_USER_GENRES = "genres/SET_USER_GENRES";
export const SET_CURRENT_GENRES = "genres/SET_CURRENT_GENRES";
export const NEW_CURRENT_GENRE = "genres/NEW_CURRENT_GENRE";
export const REMOVE_CURRENT_GENRE = "genres/REMOVE_CURRENT_GENRE";

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
// add a genre to the current user's genres
export function addCurrentGenre(genre) {
  return {
    type: NEW_CURRENT_GENRE,
    genre,
  };
}
// remove a genre from the current user's genres
export function removeCurrentGenre(genreId) {
  return {
    type: REMOVE_CURRENT_GENRE,
    genreId,
  };
}

// thunks
// fetch all genres thunk
export const getAllGenres = () => async (dispatch) => {
  const res = await fetch("/api/genres");
  const data = await res.json();
  dispatch(setAllGenres(data.genres));
  return data;
};
// fetch a user's subscribed genres thunk
export const getUserGenres = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/genres`);
  const data = await res.json();
  dispatch(setUserGenres(data.genres));
  return data;
};
// fetch the current user's subscribed genres thunk
export const getCurrentGenres = () => async (dispatch) => {
  const res = await fetch("/api/my/genres");
  const data = await res.json();
  dispatch(setCurrentGenres(data.genres));
  return data;
};
// Post a new genre to the current user's genres thunk
export const addGenre = (genreId) => async (dispatch, getState) => {
  const state = getState();
  const userId = state.session.user.id;
  const res = await fetch(`/api/my/genres`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      genreId,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addCurrentGenre(data.genre));
    return data;
  }
  return null;
};
// Remove a genre from the current user's genres thunk
export const removeGenre = (genreId) => async (dispatch) => {
  const res = await fetch(`/api/my/genres/${genreId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeCurrentGenre(genreId));
    return data;
  }
  return null;
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
      break;
    case SET_CURRENT_GENRES:
      const cGenres = {};
      action.genres.forEach((genre) => {
        cGenres[genre.id] = genre;
      });
      newState.current = cGenres;
      break;
    case NEW_CURRENT_GENRE:
      newState.current[action.genre.id] = action.genre;
      break;
    case REMOVE_CURRENT_GENRE:
      delete newState.current[action.genreId];
      break;
    default:
      break;
  }
  return newState;
}
