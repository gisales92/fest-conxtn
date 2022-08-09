import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/events";
import * as postActions from "../../store/posts";
import * as replyActions from "../../store/replies";

function EventDetail() {
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const match = useRouteMatch({
    path: "/events/:url",
    exact: true,
  });
  const url = match.params.url;
  const event = useSelector(eventActions.eventByUrlSelector(url));

  useEffect(() => {
    if (!updated && url !== undefined && event) {
      (async () => {
        try {
          await dispatch(postActions.getEventPosts(event.id));
        } finally {
          setUpdated(true);
        }
      })();
    }
  }, [dispatch, updated, url, event]);
  const fixDate = (dateStr) => new Date(dateStr).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="event-profile">
      {event ? (
        <div className="event-details">
          <img
            src={`${event?.mainPicUrl}`}
            alt="Event Header"
            className="event-profile-img"
            crossOrigin=""
          />
          <h1 className="event-detail-name">{event.name}</h1>
          <div className="event-detail-information">
            <p className="event-detail-genre">{event.genre}</p>
            <p className="event-detail-description">{event?.description}</p>
            <h4 className="event-detail-title">Venue</h4>
            <p className="event-detail-venue">{event.venueName}</p>
            <h4 className="event-detail-title">Festival Dates</h4>
            <p className="event-detail-dates">{`${fixDate(event.startDate)} to ${fixDate(event.endDate)}`}</p>
            <h4 className="event-detail-title">Official Site</h4>
            <a href={event.link} className="event-detail-link">{event.link}</a>
          </div>
          <div className="event-detail-location">
            <h3 className="event-detail-header">Location Information</h3>
            <h4 className="event-detail-title">Venue</h4>
            <p className="event-detail-info">{event.venueName}</p>
            <h4 className="event-detail-title">Location</h4>
            <p className="event-detail-info">{event.address}</p>
            <p className="event-detail-info">{`${event.city}, ${event.state} ${event.zipCode}`}</p>
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
