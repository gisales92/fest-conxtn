import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { userSelector } from "../../store/session";
import { genreNameSelector } from "../../store/genres";
import {
  fetchCurrentEvents,
  fetchGenreEvents,
  genreEventsSelector,
} from "../../store/events";
import EventCard from "./EventCard";
import "../../styles/eventCard.css";

function GenreEventList() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const match = useRouteMatch({
    path: "/genres/:genre",
    exact: true,
  });
  const genreName = decodeURIComponent(match.params.genre);
  const genre = useSelector(genreNameSelector(genreName));
  const events = useSelector(genreEventsSelector);
  const sessionUser = useSelector(userSelector);
  const eventCards = Object.keys(events).map((key) => (
    <EventCard key={key} event={events[key]} />
  ));

  useEffect(() => {
    if (Object.keys(events).length === 0) {
      (async () => {
        await dispatch(fetchGenreEvents(genre.id));
      })();
    }
    if (sessionUser && !loaded) {
      (async () => {
        try {
          await dispatch(fetchCurrentEvents());
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [sessionUser, loaded, events, genre, dispatch]);

  return (
    <div className="event-list-div">
      {loaded || !sessionUser ? (
        <ul className="event-list-ul">{eventCards}</ul>
      ) : null}
    </div>
  );
}

export default GenreEventList;
