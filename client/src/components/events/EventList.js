import React from "react";
import { useSelector } from "react-redux";
import { allEventsSelector } from "../../store/events";
import EventCard from "./EventCard";
import "../../styles/eventCard.css";

function EventList() {
    const events = useSelector(allEventsSelector);
    const eventCards = Object.values(events).map(event => <EventCard key={event.id} event={event} />)

    return (
        <div className="event-list-div">
            <h1 className="event-list-header">Events</h1>
            <ul className="event-list-ul">{eventCards}</ul>
        </div>
    );
};

export default EventList;