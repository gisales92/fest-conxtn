import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import { showModal, hideModal } from "../../store/ui";
import { LOGIN_MODAL } from "./LoginModal";
import { createPost } from "../../store/posts";
import { eventByUrlSelector } from "../../store/events";

export const NEW_POST_MODAL = "ui/modals/NEW_POST_MODAL";

const NewPostModal = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const url = window.location.href;
  const urlArr = url.split("/");
  const eventUrl = urlArr[urlArr.length - 1];
  const event = useSelector(eventByUrlSelector(eventUrl));

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
      const post = { userId: user.id, eventId: event.id, title, body };
      const data = await dispatch(createPost(post));
      if (data.message) {
        setErrors([data.message]);
      } else {
        dispatch(hideModal());
      }
    }
  };

  return (
    <div className="new-post-modal">
      <h1 className="form-header">Post</h1>

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

export default NewPostModal;
