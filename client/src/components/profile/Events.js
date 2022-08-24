import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/session";
import { currentEventSelector } from "../../store/events";
import EventCard from "../events/EventCard";
import RSVPBar from "./RSVPBar";

function Events() {
  const user = useSelector(userSelector);
  const events = useSelector(currentEventSelector);
  const goingEventCards = Object.keys(events.going).map((key) => {
    return (
      <div className="user-event-item" key={key}>
        <EventCard event={events.going[key]} />
        <RSVPBar props={{ rsvpId: 1, event: events.going[key] }} />
      </div>
    );
  });
  const interestedEventCards = Object.keys(events.interested).map((key) => {
    return (
      <div className="user-event-item" key={key}>
        <EventCard event={events.interested[key]} />
        <RSVPBar props={{ rsvpId: 2, event: events.interested[key] }} />
      </div>
    );
  });

  return (
    <div className="user-events-outer">
      <h2 className="user-events-header">Your Events</h2>
      {goingEventCards ? (
        <div className="user-event-list-outer">
          <h3>Going</h3>
          <ul className="user-event-list-ul">{goingEventCards}</ul>
        </div>
      ) : null}
      {interestedEventCards ? (
        <div className="user-event-list-outer">
          <h3>Interested</h3>
          <ul className="user-event-list-ul">{interestedEventCards}</ul>
        </div>
      ) : null}
    </div>
  );
}
export default Events;
