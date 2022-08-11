import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { genreEventsSelector } from "../../store/events";
import { userSelector } from "../../store/session";
import { fetchCurrentEvents } from "../../store/events";
import EventCard from "./EventCard";
import "../../styles/eventCard.css";

function GenreEventList() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const events = useSelector(genreEventsSelector);
  const sessionUser = useSelector(userSelector);
  const eventCards = Object.keys(events).map((key) => (
    <EventCard key={key} event={events[key]} />
  ));

  useEffect(() => {
    if (sessionUser && !loaded) {
      (async () => {
        try {
          await dispatch(fetchCurrentEvents());
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [sessionUser, loaded, dispatch]);

  return (
    <div className="event-list-div">
      {loaded || !sessionUser ? <ul className="event-list-ul">{eventCards}</ul> : null}
    </div>
  );
}

export default GenreEventList;
