import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import * as eventActions from "../../store/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

const RSVPBar = ({ rsvpId }) => {
  const [rsvp, setRSVP] = useState(rsvpId);
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: "/events/:url",
    exact: true,
  });
  const url = match.params.url;
  const event = useSelector(eventActions.eventByUrlSelector(url));

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
  }, [rsvp]);

  const handleClick1 = async (e) => {
    e.stopPropagation();
    if (rsvpId === 1) return;
    await dispatch(eventActions.createRSVP({ eventId: event.id, rsvpId: 1 }));
    setRSVP(1);
  };

  const handleClick2 = async (e) => {
    e.stopPropagation();
    if (rsvpId === 2) return;
    await dispatch(eventActions.createRSVP({ eventId: event.id, rsvpId: 2 }));
    setRSVP(2);
  };

  const handleClick0 = async (e) => {
    e.stopPropagation();
    await dispatch(eventActions.deleteRSVP(event.id));
    setRSVP(0);
  };

  return (
    <div className="rsvp-bar-outer">
      <div className="rsvp-bar-first">
        <span>RSVP:</span>
      </div>
      <button className="b1 rsvp-bar" onClick={handleClick1}>
        <FontAwesomeIcon icon={faCheckDouble} />
        Going
      </button>
      <button className="b2 rsvp-bar" onClick={handleClick2}>
      <FontAwesomeIcon icon={faCheck} />
        Interested
      </button>
      {rsvp ? (
        <button className="b0 rsvp-bar" onClick={handleClick0}>
          <FontAwesomeIcon icon={faXmark} />
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default RSVPBar;
