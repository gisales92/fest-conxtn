import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import { showModal, hideModal } from "../../store/ui";
import { LOGIN_MODAL } from "./LoginModal";
import { updatePost, focusPostSelector } from "../../store/posts";

export const EDIT_POST_MODAL = "ui/modals/EDIT_POST_MODAL";

const EditPostModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const post = useSelector(focusPostSelector);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const postId = post.id;

  const getTitleError = () => {
    if (!title) return "A post title is required";
    return "";
  };

  const getBodyError = () => (body ? "" : "A post body is required");

  useEffect(() => {
    if (hasSubmitted) {
      setTitleError(getTitleError());
      setBodyError(getBodyError());
    }
  }, [title, body, hasSubmitted, errors, user]);

  useEffect(() => {
    // if user is not logged , direct to the login modal
    if (!user) {
      dispatch(showModal(LOGIN_MODAL));
      return;
    }
  }, [dispatch, user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // front end validations
    const titleValidationError = getTitleError();
    const bodyValidationError = getBodyError();

    setTitleError(titleValidationError);
    setBodyError(bodyValidationError);

    // if there are errors dont make request
    if (!titleValidationError && !bodyValidationError) {
      // submit the post
      const post = { postId, title, body };
      const data = await dispatch(updatePost(post));
      if (data.message) {
        setErrors([data.message]);
      } else {
        dispatch(hideModal());
      }
    }
  };

  return (
    <div className="new-post-modal">
      <h1 className="form-header">Edit Post</h1>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="title">Post title</label>
          <input
            name="title"
            type="text"
            placeholder="Your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title" className="field-error">
            {titleError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="body">Post body</label>
          <textarea
            name="body"
            placeholder="Your post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label htmlFor="body" className="field-error">
            {bodyError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="submit" className="field-error">
            {errors}
          </label>
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostModal;
