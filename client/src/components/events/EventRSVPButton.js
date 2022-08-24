import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const RSVPButton = ({ rsvpId }) => {
  return (
    <div>
      {rsvpId === 1 ? (
        <button className="rsvp-button going">
          <FontAwesomeIcon icon={faCheckDouble} /> Going
        </button>
      ) : (
        <button className="rsvp-button interested">
          <FontAwesomeIcon icon={faCheck} /> Interested
        </button>
      )}
    </div>
  );
};

export default RSVPButton;
