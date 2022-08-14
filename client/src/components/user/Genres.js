import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { otherUserSelector } from "../../store/user";
import { getUserGenres, userGenresSelector } from "../../store/genres";
import { fetchGenreEvents } from "../../store/events";

function Genres() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(otherUserSelector);
  const genres = useSelector(userGenresSelector);

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

  useEffect(() => {
    if (!loaded && user.id) {
      (async () => {
        try {
          await dispatch(getUserGenres(user.id));
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, loaded, user]);

  return <div className="user-events-outer">{genreBoxes}</div>;
}
export default Genres;
