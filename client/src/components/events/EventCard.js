import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/eventCard.css";

const EventCard = ({ event }) => {
  const history = useHistory();
  const redirectToEvent = (e) => {
    history.push(`/events/${event.url}`);
  };

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
      <p className="event-card-date">{startDate}</p>
    </div>
  );
};

export default EventCard;
