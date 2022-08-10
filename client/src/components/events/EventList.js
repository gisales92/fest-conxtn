import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { allEventsSelector } from "../../store/events";
import EventCard from "./EventCard";
import "../../styles/eventCard.css";

function EventList() {
  const [eventKeys, setEventKeys] = useState([1, 2, 3, 4, 5, 6]);
  const events = useSelector(allEventsSelector);
  const eventCards = eventKeys.map((key) => (
    <EventCard key={key} event={events[key]} />
  ));

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    } else {
      const newKeys = [...eventKeys];
      const startingKey = eventKeys.length + 1;
      for (let i = startingKey; i < startingKey + 6; i++) {
        if (events[i]) {
          newKeys.push(i);
        } else {
          setEventKeys(newKeys);
          return;
        }
      }
      setEventKeys(newKeys);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [eventKeys]);

  return (
    <div className="event-list-div">
      <ul className="event-list-ul">{eventCards}</ul>
    </div>
  );
}

export default EventList;
