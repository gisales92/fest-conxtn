import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as genreActions from "../../store/genres";
import { fetchGenreEvents } from "../../store/events";
import "../../styles/genreBar.css";

const GenreBar = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector(genreActions.allGenresSelector);

  useEffect(() => {
    if (!loaded) {
      (async () => {
        await dispatch(genreActions.getAllGenres());
        setLoaded(true);
      })();
    }
  }, [loaded]);

  const handleClick =async (e) => {
    e.stopPropagation();
    await dispatch(fetchGenreEvents(e.target.id))
    history.push(`/genres/${e.target.innerHTML}`)
  }

  const genreBoxes = Object.keys(genres).map((genreId) => (
    <div className="genre-box" id={genreId} onClick={handleClick}>
      {genres[genreId].type}
    </div>
  ));

  return (
    <div className="genre-bar-outer">
      {loaded ? (
        <div className="genre-bar-inner">
          <div className="genre-bar-label">
            <span>Event Genres</span>
          </div>
          {genreBoxes}
        </div>
      ) : null}
    </div>
  );
};

export default GenreBar;
