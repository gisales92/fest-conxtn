import React from "react";

const RSVPButton = ({ rsvpId }) => {
  return (
    <div>
      {rsvpId === 1 ? (
        <button className="rsvp-button going">Going</button>
      ) : (
        <button className="rsvp-button interested">Interested</button>
      )}
    </div>
  );
};

export default RSVPButton;
