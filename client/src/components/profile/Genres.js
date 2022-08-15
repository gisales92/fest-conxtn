import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { otherUserSelector } from "../../store/user";
import { currentGenresSelector } from "../../store/genres";
import { fetchGenreEvents } from "../../store/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
function Genres() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const user = useSelector(otherUserSelector);
  const genres = useSelector(currentGenresSelector);

  const handleClick = async (e) => {
    e.stopPropagation();
    history.push(`/genres/${encodeURIComponent(e.target.dataset.name)}`);
    await dispatch(fetchGenreEvents(e.target.dataset.id));
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
      {genreBoxes.length ? (
        <div className="user-genres-inner">
          <div className="user-genres-label">
            <span>
              <FontAwesomeIcon icon={faHeart} />
              {"  "}Likes
            </span>
          </div>
          {genreBoxes}
        </div>
      ) : null}
    </div>
  );
}
export default Genres;
