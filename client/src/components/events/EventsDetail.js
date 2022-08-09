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

  useEffect(() => {
    if (!updated && url !== undefined) {
      (async () => {
        try {
          await dispatch();
          await dispatch(fetchAllEvents());
        } finally {
          setUpdated(true);
        }
      })();
    }
  }, [dispatch, updated, url]);

  const restaurant = useSelector(restaurantActions.restaurantUrlSelector(url));
  const reviews = useSelector(restaurantReviewsSelector);

  return (
    <div className="restDetail">
      <img
        src={`${restaurant?.preview_image_url}`}
        alt="Restaurant Header"
        className="restHeaderImg"
        crossOrigin=""
      />
      <div className="restProfile">
        <h1 className="restName">{restaurant?.name}</h1>
        <div className="restOverview">
          {restaurant?.rating ? (
            <p className="restRating">
              Rating: {restaurant?.rating.toFixed(2)}/5
            </p>
          ) : null}
          <p className="restInfo">
            {restaurant?.cuisine_type} • {"$".repeat(restaurant?.price)} •{" "}
            {restaurant?.location.city}
          </p>
        </div>
        {restaurant ? (
          <button
            className="nav-button hover-effect sign-up-button reservation-button"
            onClick={openReservationModal}
          >
            <span>Make A Reservation</span>
            <FontAwesomeIcon icon={faClipboard} className="icon" />
          </button>
        ) : null}
        {restaurant ? (
          <div className="restDetails">
            <h4 className="rest-detail-header">Additional Info</h4>
            <h6 className="rest-detail-title">Opening Time</h6>
            <p className="rest-detail-info">
              {fixTimes(restaurant.opening_time)}
            </p>
            <h6 className="rest-detail-title">Closing Time</h6>
            <p className="rest-detail-info">
              {fixTimes(restaurant.closing_time)}
            </p>
            <h6 className="rest-detail-title">Location</h6>
            <p className="rest-detail-info">{restaurant.address_line_1}</p>
            <p className="rest-detail-info">{restaurant.address_line_2}</p>
            <p className="rest-detail-info">{`${restaurant.location?.city}, ${restaurant.location?.state}`}</p>
          </div>
        ) : null}
        <div className="restaurant-gallery">
          <RestaurantGallery props={{ updated, restaurant }} />
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
