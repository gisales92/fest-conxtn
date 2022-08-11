import React, { useState, useEffect } from "react";
import * as eventActions from "../../store/events";

const RSVPBar = ({ rsvpId }) => {
  const [rsvp, setRSVP] = useState(rsvpId);

  useEffect(() => {
      const el = document.querySelector(".b1");
      const el1 = document.querySelector(".b2");
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
  }, [rsvp])

  const handleClick1 = (e) => {
    e.stopPropagation();
    setRSVP(1);
  }

  const handleClick2 = (e) => {
    e.stopPropagation();
    setRSVP(2);
  }

  const handleClick0 = (e) => {
    e.stopPropagation();
    setRSVP(0);
  }

  return (
    <div className="rsvp-bar-outer">
      <div className="rsvp-bar-first">
        <span>RSVP:</span>
      </div>
      <button className="b1 rsvp-bar" onClick={handleClick1}>Going</button>
      <button className="b2 rsvp-bar" onClick={handleClick2}>Interested</button>
      {rsvp ? <button className="b0 rsvp-bar" onClick={handleClick0}>Clear</button> : null}
    </div>
  );
};

export default RSVPBar;
