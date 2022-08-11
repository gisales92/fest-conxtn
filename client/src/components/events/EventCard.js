import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentEventSelector } from "../../store/events";
import { userSelector } from "../../store/session";
import RSVPButton from "./EventRSVPButton";

const EventCard = ({ event }) => {
  const history = useHistory();
  const sessionUser = useSelector(userSelector);
  const events = useSelector(currentEventSelector);
  const [rsvp, setRSVP] = useState(0);
  const redirectToEvent = (e) => {
    history.push(`/events/${event.url}`);
  };

  useEffect(() => {
    if (sessionUser) {
      if (events.going[event.id]) {
        setRSVP(1);
      } else if (events.interested[event.id]) {
        setRSVP(2);
      }
    } else {
      setRSVP(0)
    }
  }, [setRSVP, sessionUser, events, event])

  // if no event in store
  if (!event) {
    return (
      <div className="event-card">
        Sorry, the festival information is not loaded
      </div>
    );
  }

  const startDate = new Date(event.startDate).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "GMT",
  });



  return (
    <div className="event-card" onClick={redirectToEvent}>
      <img
        className="event-card-img"
        src={event.mainPicUrl}
        alt={`Thumbnail for ${event.name}`}
        crossOrigin=""
      />
      <p className="event-card-name">{event.name}</p>
      <div className="event-card-lower">
        <p className="event-card-date">{startDate}</p>
        {rsvp === 1 ? <RSVPButton rsvpId={1} /> : null}
        {rsvp === 2 ? <RSVPButton rsvpId={2} /> : null}
      </div>
    </div>
  );
};

export default EventCard;
