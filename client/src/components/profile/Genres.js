import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentGenresSelector } from "../../store/genres";
import { userSelector } from "../../store/session";
import { fetchGenreEvents } from "../../store/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen } from "@fortawesome/free-solid-svg-icons";
import { showModal } from "../../store/ui";
import { EDIT_GENRES_MODAL } from "../modals/EditGenresModal";

function Genres() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSelector);
  const genres = useSelector(currentGenresSelector);

  const handleClick = async (e) => {
    e.stopPropagation();
    history.push(`/genres/${encodeURIComponent(e.target.dataset.name)}`);
    await dispatch(fetchGenreEvents(e.target.dataset.id));
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    dispatch(showModal(EDIT_GENRES_MODAL));
  };

  const genreBoxes = Object.keys(genres).map((genreId) => (
    <div
      className="genre-box user"
      data-id={genreId}
      data-name={genres[genreId].type}
      key={genreId}
      id={`genre${genreId}`}
      onClick={handleClick}
    >
      {genres[genreId].type}
    </div>
  ));

  return (
    <div className="user-genres-outer">
      <div className="user-genres-left">
        <div className="user-genres-label">
          <span>
            <FontAwesomeIcon icon={faHeart} />
            {"  "}Likes
          </span>
        </div>
        {genreBoxes.length ? (
          <div className="profile-genres-inner">{genreBoxes}</div>
        ) : null}
      </div>
      <div className="profile-genres-right">
        <span className="edit-profile-genres" onClick={handleEditClick}>
          Edit{"  "}
          <FontAwesomeIcon icon={faPen} />
        </span>
      </div>
    </div>
  );
}
export default Genres;
