import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/session";
import { otherUserSelector } from "../../store/user";
import { fetchUserEvents, userEventSelector, fetchCurrentEvents } from "../../store/events";
import EventCard from "../events/EventCard";

function Events() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);
  const curUser = useSelector(userSelector)
  const events = useSelector(userEventSelector);
  const goingEventCards = Object.keys(events.going).map((key) => {
    return <EventCard key={key} event={events.going[key]} />;
  });
  const interestedEventCards = Object.keys(events.interested).map((key) => {
    return <EventCard key={key} event={events.interested[key]} />;
  });

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(fetchUserEvents(user.id));
          if (curUser) {
            dispatch(fetchCurrentEvents());
          }
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user, curUser]);

  return (
    <div className="user-events-outer">
      <h2 className="user-events-header">{`${user.username}'s Events`}</h2>
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
