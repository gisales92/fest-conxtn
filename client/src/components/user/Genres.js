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
  const [userId, setUserId] = useState("");
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
    if ((user.id && !loaded) || ((user.id !== userId) && user.id)) {
      (async () => {
        await dispatch(getUserGenres(user.id));
        setUserId(user.id);
        setLoaded(true);
      })();
    }
  }, [user, dispatch]);

  return <div className="user-events-outer">{genreBoxes}</div>;
}
export default Genres;
