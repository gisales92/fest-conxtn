import React, { useState } from "react";
import * as eventActions from "../../store/events";

const RSVPBar = ({ rsvpId }) => {
    console.log(rsvpId)
  const [rsvp, setRSVP] = useState(rsvpId);
  return (
    <div className="rsvp-bar-outer">
      <div className="rsvp-bar-first">
        <span>RSVP here:</span>
      </div>
      <button className="going-rsvp-button">Going</button>
      <button className="interested-rsvp-button">Interested</button>
      {rsvp ? <button className="clear-rsvp-button">Clear</button> : null}
    </div>
  );
};

export default RSVPBar;
