// constants
export const SET_EVENTS = "events/SET_EVENTS";
export const SET_GENRE_EVENTS = "events/SET_GENRE_EVENTS";
export const SET_USER_EVENTS = "events/SET_USER_EVENTS";

// selectors
export const allEventsSelector = (state) => state.events.all;
export const eventByIdSelector = (id) => (state) => state.events.all[id];
export const genreEventsSelector = (state) => state.events.genre;
export const userEventSelector = (state) => state.events.user;

// action creators
// set all events
export function setAllEvents(events) {
  return {
    type: SET_EVENTS,
    events,
  };
}
// set genre events
export function setGenreEvents(events) {
  return {
    type: SET_GENRE_EVENTS,
    events,
  };
}
// set user events
export function setUserEvents(events) {
  return {
    type: SET_USER_EVENTS,
    events,
  };
}

// thunks
// fetch all events thunk
export const fetchAllEvents = () => async (dispatch) => {
  const res = await fetch("/api/events");
  const data = await res.json();

  dispatch(setAllEvents(data.events));
  return data;
};
// fetch events of a genre thunk
export const fetchGenreEvents = (genreId) => async (dispatch) => {
  const res = await fetch(`/api/events?genre=${genreId}`);
  const data = await res.json();

  dispatch(setGenreEvents(data.events));
  return data;
};
// fetch events for a given user thunk
export const fetchUserEvents = (userId) => async (dispatch) => {
  const res = await fetch(`/api/user/${userId}/events`);
  const data = await res.json();
  dispatch(setUserEvents(data.events));
  return data;
};

// reducer
export default function eventsReducer(
  state = { all: {}, genre: {}, current: {}, user: {} },
  action
) {
  const newState = { ...state };
  newState.all = { ...state.all };
  newState.genre = { ...state.genre };
  newState.current = { ...state.current };
  newState.user = { ...state.user };

  switch (action.type) {
    case SET_EVENTS:
      const events = {};
      action.events.forEach((event) => {
        events[event.id] = event;
      });
      newState.all = events;
      break;
    case SET_GENRE_EVENTS:
      const gEvents = {};
      action.events.forEach((event) => {
        gEvents[event.id] = event;
      });
      newState.genre = gEvents;
      break;
    case SET_USER_EVENTS:
      const uEvents = { going: {}, interested: {} };
      action.events.going.forEach((event) => {
        uEvents.going[event.id] = event;
      });
      action.events.interested.forEach((event) => {
        uEvents.interested[event.id] = event;
      });
      newState.user = uEvents;
      break;
    default:
      break;
  }
  return newState;
}
