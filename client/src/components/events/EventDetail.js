import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Map from "./Map";
import RSVPBar from "./RSVPBar";
import * as eventActions from "../../store/events";
import * as postActions from "../../store/posts";
import * as replyActions from "../../store/replies";
import { userSelector } from "../../store/session";
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
      console.log(userEvents);
      console.log(userEvents.interested);
      if (userEvents.going[event.id]) {
        setRSVP(1);
      } else if (userEvents.interested[event.id]) {
        setRSVP(2);
      } else {
        setRSVP(0);
      }
      setUserUpdate(true);
    }
  }, [setRSVP, sessionUser, updated]);

  const fixDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "GMT",
    });
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
              <p className="event-detail-description">{event?.description}</p>
              <h4 className="event-detail-title">Festival Dates</h4>
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
            <div className="event-detail-location">
              <div className="event-detail-location-left">
                <h3 className="event-detail-header">Location Information</h3>
                <h4 className="event-detail-title">Venue</h4>
                <p className="event-detail-info">{event.venueName}</p>
                <h4 className="event-detail-title">Location</h4>
                <p className="event-detail-info">{event.address}</p>
                <p className="event-detail-info">{`${event.city}, ${event.state} ${event.zipCode}`}</p>
              </div>
              <div className="event-detail-location-right">
                <Map lat={event.lat} lng={event.lng} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="event-profile-posts">
        <h2 className="event-posts-header">Posts</h2>
      </div>
    </div>
  );
}

export default EventDetail;
