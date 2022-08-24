import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as eventActions from "../../store/events";

const RSVPBar = ({ props }) => {
  const { rsvpId, event } = props;
  const [rsvp, setRSVP] = useState(rsvpId);
  const dispatch = useDispatch();
  console.log("EVENT: ", event);

  useEffect(() => {
    const el = document.querySelector(`.${event.url}.b1`);
    const el1 = document.querySelector(`.${event.url}.b2`);
    if (rsvp === 1) {
      el.classList.add("active");
      el1.classList.remove("active");
    } else if (rsvp === 2) {
      el1.classList.add("active");
      el.classList.remove("active");
    } else {
      el.classList.remove("active");
      el1.classList.remove("active");
    }
  }, [rsvp]);

  const handleClick1 = async (e) => {
    e.stopPropagation();
    await dispatch(eventActions.createRSVP({ eventId: event.id, rsvpId: 1 }));
    setRSVP(1);
  };

  const handleClick2 = async (e) => {
    e.stopPropagation();
    await dispatch(eventActions.createRSVP({ eventId: event.id, rsvpId: 2 }));
    setRSVP(2);
  };

  const handleClick0 = async (e) => {
    e.stopPropagation();
    await dispatch(eventActions.deleteRSVP(event.id));
    setRSVP(0);
  };

  return (
    <div className="rsvp-bar-outer user">
      <div className="rsvp-bar-first">
        <span>RSVP:</span>
      </div>
      <button className={`${event.url} b1 rsvp-bar`} onClick={handleClick1}>
        Going
      </button>
      <button className={`${event.url} b2 rsvp-bar`} onClick={handleClick2}>
        Interested
      </button>
      {rsvp ? (
        <button className="b0 rsvp-bar" onClick={handleClick0}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default RSVPBar;
