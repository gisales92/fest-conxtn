import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ui from "./ui";
import session from "./session";
import events from "./events";
import genres from "./genres";
import user from "./user";
import posts from "./posts";
import replies from "./replies";
import messages from "./messages";

const rootReducer = combineReducers({
  ui,
  session,
  events,
  genres,
  user,
  posts,
  replies,
  messages,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
