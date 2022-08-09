// constants
export const SET_EVENTS = "events/SET_EVENTS";
export const SET_GENRE_EVENTS = "events/SET_GENRE_EVENTS";
export const SET_USER_EVENTS = "events/SET_USER_EVENTS";
export const SET_CURRENT_EVENTS = "events/SET_CURRENT_EVENTS";
export const NEW_RSVP = "events/NEW_RSVP";
export const UPDATE_RSVP = "events/UPDATE_RSVP";
export const DELETE_RSVP = "events/DELETE-RSVP";

// selectors
export const allEventsSelector = (state) => state.events.all;
export const eventByUrlSelector = (url) => (state) => {
  Object.keys(state.events.all).forEach((event) => {
    if (event.url === url) {
      return state.events.all[event.id];
    }
  });
};
export const eventByIdSelector = (id) => (state) => state.events.all[id];
export const genreEventsSelector = (state) => state.events.genre;
export const userEventSelector = (state) => state.events.user;
export const currentEventSelector = (state) => state.events.current;

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
// set current user events
export function setCurrentEvents(events) {
  return {
    type: SET_CURRENT_EVENTS,
    events,
  };
}
// set RSVP for an event
export function setRSVP(rsvp) {
  return {
    type: NEW_RSVP,
    rsvp,
  };
}
// update RSVP for an event
export function updateRSVPAction(rsvpId, eventId) {
  return {
    type: UPDATE_RSVP,
    rsvpId,
    eventId,
  };
}
// delete RSVP for an event
export function deleteRSVPAction(eventId) {
  return {
    type: DELETE_RSVP,
    eventId,
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
// fetch events for current user thunk
export const fetchCurrentEvents = () => async (dispatch) => {
  const res = await fetch("/api/my/events");
  const data = await res.json();
  dispatch(setUserEvents(data.events));
  return data;
};
// RSVP to an event for current user thunk
export const createRSVP = (rsvp) => async (dispatch, getState) => {
  const state = getState();
  const userId = state.session.user.id;
  const { eventId, rsvpId } = rsvp;
  const res = await fetch("/api/my/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      eventId,
      rsvpId,
    }),
  });
  const data = await res.json();
  dispatch(setRSVP(data));
  return data;
};
// Update RSVP for an event for the current user
export const updateRSVP = (rsvp) => async (dispatch) => {
  const { eventId, rsvpId } = rsvp;
  const res = await fetch(`/api/my/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rsvpId,
    }),
  });
  const data = await res.json();
  dispatch(updateRSVPAction(rsvpId, eventId));
  return data;
};

// Delete RSVP for an event for the current user
export const deleteRSVP = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/my/events/${eventId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(deleteRSVPAction());
  }
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
  newState.current.going = { ...state.current.going };
  newState.current.interested = { ...state.current.interested };
  newState.user = { ...state.user };
  newState.user.going = { ...state.user.going };
  newState.user.interested = { ...state.user.interested };

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
    case SET_CURRENT_EVENTS:
      const cEvents = { going: {}, interested: {} };
      action.events.going.forEach((event) => {
        cEvents.going[event.id] = event;
      });
      action.events.interested.forEach((event) => {
        cEvents.interested[event.id] = event;
      });
      newState.current = cEvents;
      break;
    case NEW_RSVP:
      newState.user[action.rsvp.rsvp][action.rsvp.event.id] =
        newState.all[action.rsvp.event.id];
      break;
    case UPDATE_RSVP:
      if (action.rsvpId === 1) {
        newState.user.going[action.eventId] =
          newState.user.interested[action.eventId];
        delete newState.user.interested[action.eventId];
      } else {
        newState.user.interested[action.eventId] =
          newState.user.going[action.eventId];
        delete newState.user.going[action.eventId];
      }
      break;
    case DELETE_RSVP:
      if (newState.user.going[action.eventId]) {
        delete newState.user.going[action.eventId];
      } else {
        delete newState.user.interested[action.eventId];
      }
      break;
    default:
      break;
  }
  return newState;
}
