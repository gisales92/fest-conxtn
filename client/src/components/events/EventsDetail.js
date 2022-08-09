import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/events";
import * as postActions from "../../store/posts";
import * as replyActions from "../../store/replies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <p className="event-detail-venue">{event.venueName}</p>
            <p className="event-detail-start">{event.startDate}</p>
            <p className="event-detail-end">{event.endDate}</p>
            <p className="event-detail-description">{event?.description}</p>
            <p className="event-detail-link">{event.link}</p>
          </div>
          <div className="event-detail-location">
            <h4 className="event-detail-header">Location Information</h4>
            <h6 className="event-detail-title">Venue</h6>
            <p className="event-detail-info">{event.venueName}</p>
            <h6 className="event-detail-title">Location</h6>
            <p className="event-detail-info">{event.address}</p>
            <p className="event-detail-info">{`${event.city}, ${event.state} ${event.zipCode}`}</p>
          </div>
        </div>
      ) : null}
      <div className="event-profile-posts">
        <h3 className="event-posts-header">Posts</h3>
      </div>
    </div>
  );
}

export default EventDetail;
