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

  return (
    <div className="rsvp-bar-outer">
      <div className="rsvp-bar-first">
        <span>RSVP:</span>
      </div>
      <button className="b1 rsvp-bar">Going</button>
      <button className="b2 rsvp-bar">Interested</button>
      {rsvp ? <button className="b3 rsvp-bar">Clear</button> : null}
    </div>
  );
};

export default RSVPBar;
