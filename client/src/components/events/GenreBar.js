import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as genreActions from "../../store/genres";
import { fetchGenreEvents } from "../../store/events";
import "../../styles/genreBar.css";

const GenreBar = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector(genreActions.allGenresSelector);
  const match = useRouteMatch({
    path: "/genres/:genre",
    exact: true,
  });
  const genreName = decodeURIComponent(match?.params.genre);
  const genre = useSelector(genreActions.genreNameSelector(genreName));
  const match1 = useRouteMatch({
    path: "/",
    exact: true,
  });

  useEffect(() => {
    if ((!loaded && genre) || match1) {
      (async () => {
        await dispatch(genreActions.getAllGenres());
        if (genre) {
          await dispatch(fetchGenreEvents(genre.id));
        }
        setLoaded(true);
      })();
    }
  }, [loaded, genre, dispatch]);

  useEffect(() => {
    if (loaded) {
      const all = document.querySelectorAll(".genre-box");
      all.forEach((el) => {
        el.classList.remove("active");
      });
      if (match) {
        const el = document.querySelector(`#genre${genre.id}`);
        el.classList.add("active");
      }
    }
  }, [genre, loaded, match]);

  const handleClick = async (e) => {
    e.stopPropagation();
    history.push(`/genres/${encodeURIComponent(e.target.dataset.name)}`);
    await dispatch(fetchGenreEvents(e.target.dataset.id));
  };

  const genreBoxes = Object.keys(genres).map((genreId) => (
    <div
      className="genre-box"
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
    <div className="genre-bar-outer">
      {loaded ? (
        <div className="genre-bar-inner">
          <div className="genre-bar-label">
            <span>Events by Genre</span>
          </div>
          {genreBoxes}
        </div>
      ) : null}
    </div>
  );
};

export default GenreBar;
