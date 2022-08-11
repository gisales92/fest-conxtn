import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as genreActions from "../../store/genres";

const GenreBar = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const genres = useSelector(genreActions.allGenresSelector);

  useEffect(() => {
    if (!loaded) {
      (async () => {
        await dispatch(genreActions.getAllGenres());
        setLoaded(true);
      })();
    }
  }, [loaded]);

  const genreBoxes = Object.keys(genres).map((genreId) => (
    <div className="genre-box" id={genreId}>{genres[genreId].type}</div>
  ));

  return (
  <div className="genre-bar-outer">
    {loaded ? <div className="genre-bar-inner"> <div className="genre-bar-label"><span>Event Genres</span></div>{genreBoxes} </div> : null}
    </div>);
};

export default GenreBar;
