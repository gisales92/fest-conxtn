import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import { showModal } from "../../store/ui";
import { LOGIN_MODAL } from "./LoginModal";
import {
  allGenresSelector,
  currentGenresSelector,
  addGenre,
  removeGenre,
} from "../../store/genres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";

export const EDIT_GENRES_MODAL = "ui/modals/EDIT_GENRES_MODAL";

const EditGenresModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const allGenres = useSelector(allGenresSelector);
  const currentGenres = useSelector(currentGenresSelector);
  const allGenreKeys = Object.keys(allGenres);

  useEffect(() => {
    // if user is not logged , direct to the login modal
    if (!user) {
      dispatch(showModal(LOGIN_MODAL));
      return;
    }
  }, [dispatch, user]);

  const handleLike = async (e) => {
    e.stopPropagation();
    await dispatch(addGenre(e.target.id));
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    await dispatch(removeGenre(e.target.id));
  };

  const genreRows = allGenreKeys.map((genreId) => {
    const liked = currentGenres[genreId];
    return (
      <div className="form-row genre" key={genreId}>
        <p className="form-label genre">{allGenres[genreId].type}</p>
        {liked ? (
          <button className="remove-genre genre-action" id={genreId} onClick={handleRemove}>
            Remove{"  "}
            <FontAwesomeIcon icon={faXmark} />
          </button>
        ) : (
          <button className="add-genre genre-action" id={genreId} onClick={handleLike}>
            Like{"  "}
            <FontAwesomeIcon icon={faHeart} />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="edit-genre-modal">
      <h1 className="form-header">Edit Your Liked Genres</h1>
      {genreRows}
    </div>
  );
};

export default EditGenresModal;
