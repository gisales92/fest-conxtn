// constants
export const SET_EVENTS = "events/SET_EVENTS";

// selectors
export const allEventsSelector = (state) => state.events.all;

// action creators
// set all events
export function setAllEvents(events) {
    return {
        type: SET_EVENTS,
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
}

// reducer
export default function eventsReducer (
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
            break

        default:
            break;
    }
    return newState;
}