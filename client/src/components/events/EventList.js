import React from "react";
import { useSelector } from "react-redux";
import { allEventsSelector } from "../../store/events";

function EventList() {
    const events = useSelector(allEventsSelector);

    return (
        <div className="event-list-div">
            <h1 className="event-list-header">Events</h1>
            <ul className="event-list-ul"></ul>
        </div>
    );
};

export default EventList;