import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { fetchUserEvents, userEventSelector } from "../../store/events";
import EventCard from "../events/EventCard";
import "../../styles/eventCard.css";

function Events() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);
  const events = useSelector(userEventSelector);
  const goingEventCards = Object.keys(events.going).map((key) => {
    console.log("EVENT: ", events.going[key]);
    return <EventCard key={key} event={events.going[key]} />;
  });
  const interestedEventCards = Object.keys(events.interested).map((key) => {
    console.log("EVENT: ", events.interested[key]);
    return <EventCard key={key} event={events.interested[key]} />;
  });

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(fetchUserEvents(user.id));
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return (
    <div className="user-events-outer">
      <h2 className="user-events-header">Events</h2>
      {loaded && goingEventCards ? (
        <div className="user-event-list-outer">
          <h3>Going</h3>
          <ul className="user-event-list-ul">{goingEventCards}</ul>
        </div>
      ) : null}
      {loaded && interestedEventCards ? (
        <div className="user-event-list-outer">
          <h3>Interested</h3>
          <ul className="user-event-list-ul">{interestedEventCards}</ul>
        </div>
      ) : null}
    </div>
  );
}
export default Events;
