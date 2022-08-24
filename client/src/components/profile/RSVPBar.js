import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as eventActions from "../../store/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const RSVPBar = ({ props }) => {
  const { rsvpId, event } = props;
  const [rsvp, setRSVP] = useState(rsvpId);
  const dispatch = useDispatch();

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
    if (rsvpId === 1) return
    await dispatch(eventActions.createRSVP({ eventId: event.id, rsvpId: 1 }));
    setRSVP(1);
    await dispatch(eventActions.fetchCurrentEvents());
  };

  const handleClick2 = async (e) => {
    e.stopPropagation();
    if (rsvpId === 2) return
    await dispatch(eventActions.createRSVP({ eventId: event.id, rsvpId: 2 }));
    setRSVP(2);
    await dispatch(eventActions.fetchCurrentEvents());
  };

  const handleClick0 = async (e) => {
    e.stopPropagation();
    await dispatch(eventActions.deleteRSVP(event.id));
    setRSVP(0);
    await dispatch(eventActions.fetchCurrentEvents());
  };

  return (
    <div className="rsvp-bar-outer user">
      <div className="rsvp-bar-first user">
        <span>Update:</span>
      </div>
      <button
        className={`${event.url} b1 rsvp-bar user`}
        onClick={handleClick1}
      >
        <FontAwesomeIcon icon={faCheckDouble} />
        Going
      </button>
      <button
        className={`${event.url} b2 rsvp-bar user`}
        onClick={handleClick2}
      >
        <FontAwesomeIcon icon={faCheck} />
        Interested
      </button>
      {rsvp ? (
        <button className="b0 rsvp-bar user" onClick={handleClick0}>
          <FontAwesomeIcon icon={faXmark} />
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default RSVPBar;
