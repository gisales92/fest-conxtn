import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otherUserSelector } from "../../store/user";
import { fetchUserEvents, userEventSelector } from "../../store/events";
import EventCard from "../events/EventCard";
import "../../styles/eventCard.css"

function Events() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);
  const events = useSelector(userEventSelector);
  const goingEventCards = Object.keys(events.going).map((key) => {
    console.log("EVENT: ", events.going[key])
    return <EventCard key={key} event={events.going[key]} />
});
const interestedEventCards = Object.keys(events.interested).map((key) => {
    console.log("EVENT: ", events.interested[key])
    return <EventCard key={key} event={events.interested[key]} />
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
      {loaded && goingEventCards ? <ul className="user-event-list-ul">{goingEventCards}</ul> : null}
      {loaded && interestedEventCards ? <ul className="user-event-list-ul">{interestedEventCards}</ul> : null}
    </div>
  );
}
export default Events;
