import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Map from "./Map";
import RSVPBar from "./RSVPBar";
import EventBoard from "../board/EventBoard";
import * as eventActions from "../../store/events";
import * as postActions from "../../store/posts";
import { userSelector } from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { showModal } from "../../store/ui";
import { NEW_POST_MODAL } from "../modals/NewPostModal";
import "../../styles/eventDetail.css";

function EventDetail() {
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);
  const [rsvp, setRSVP] = useState(0);
  const match = useRouteMatch({
    path: "/events/:url",
    exact: true,
  });
  const url = match.params.url;
  const event = useSelector(eventActions.eventByUrlSelector(url));
  const sessionUser = useSelector(userSelector);
  const userEvents = useSelector(eventActions.currentEventSelector);

  useEffect(() => {
    if (!updated && url !== undefined && event) {
      (async () => {
        try {
          await dispatch(postActions.getEventPosts(event.id));
          if (sessionUser) {
            await dispatch(eventActions.fetchCurrentEvents());
          }
        } finally {
          setUpdated(true);
        }
      })();
    }
  }, [dispatch, updated, url, event, sessionUser]);

  useEffect(() => {
    if (sessionUser && updated) {
      if (userEvents.going[event.id]) {
        setRSVP(1);
      } else if (userEvents.interested[event.id]) {
        setRSVP(2);
      } else {
        setRSVP(0);
      }
      setUserUpdate(true);
    }
  }, [setRSVP, sessionUser, updated, userEvents, event]);

  const fixDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "GMT",
    });
  };

  const openNewPostModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(showModal(NEW_POST_MODAL));
  };

  return (
    <div className="event-profile">
      {event ? (
        <div className="event-details">
          <div className="event-detail-upper">
            <img
              src={`${event?.mainPicUrl}`}
              alt="Event Header"
              className="event-profile-img"
              crossOrigin=""
            />
            <p className="event-detail-genre">{event.genre}</p>
          </div>
          <div className="event-detail-body">
            <div className="event-detail-top">
              <h1 className="event-detail-name">{event.name}</h1>
            </div>
            {updated && sessionUser && userUpdate ? (
              <RSVPBar rsvpId={rsvp} />
            ) : null}
            <div className="event-detail-information">
              <h4 className="event-detail-title">Festival Description</h4>
              <p className="event-detail-description">{event?.description}</p>
            </div>
            <div className="event-detail-location">
              <div className="event-detail-location-left">
                <h4 className="event-detail-title">Dates</h4>
                <p className="event-detail-dates">{`${fixDate(
                  event.startDate
                )} to ${fixDate(event.endDate)}`}</p>
                <h4 className="event-detail-title">Official Site</h4>
                <a
                  href={event.link}
                  className="event-detail-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.link}
                </a>
              </div>
              <div className="event-detail-location-right">
                <h3 className="event-detail-header">Location Information</h3>
                <h4 className="event-detail-title">Venue</h4>
                <p className="event-detail-info">{event.venueName}</p>
                <h4 className="event-detail-title">Location</h4>
                <p className="event-detail-info">{event.address}</p>
                <p className="event-detail-info">{`${event.city}, ${event.state} ${event.zipCode}`}</p>
              </div>
            </div>
              <Map pos={[event.lat, event.lng]} name={event.venueName} />
          </div>
        </div>
      ) : null}
      <div className="event-posts-container">
        <div className="event-posts-top">
          <h2 className="event-posts-header">Festival Board</h2>
          <button className="create-button post" onClick={openNewPostModal}>
            New Post <FontAwesomeIcon icon={faPlus} className="create-icon" />
          </button>
        </div>
        <EventBoard />
      </div>
    </div>
  );
}

export default EventDetail;
