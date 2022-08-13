import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_MODAL } from "./LoginModal";
import { showModal, hideModal } from "../../store/ui";
import { userSelector } from "../../store/session";
import { createReply } from "../../store/replies";
import { focusPostSelector } from "../../store/posts";
import "../../styles/modals.css";

export const NEW_REPLY_MODAL = "ui/modals/NEW_REPLY_MODAL";

const NewReplyModal = () => {
  const [errors, setErrors] = useState([]);

  const [body, setBody] = useState("");

  const [bodyError, setBodyError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const post = useSelector(focusPostSelector);

  const getBodyError = () => (body ? "" : "A reply body is required");

  useEffect(() => {
    if (hasSubmitted) {
      setBodyError(getBodyError());
    }
  }, [body, hasSubmitted, errors, user]);

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
    const bodyValidationError = getBodyError();

    setBodyError(bodyValidationError);

    // if there are errors dont make request
    if (!bodyValidationError) {
      // submit the post
      const reply = { userId: user.id, postId: post.id, body };
      const data = await dispatch(createReply(reply));
      if (data.message) {
        setErrors([data.message]);
      } else {
        dispatch(hideModal());
      }
    }
  };

  return (
    <div className="new-post-modal">
      <h1 className="form-header">Create Reply</h1>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="body">Reply body</label>
          <textarea
            name="body"
            placeholder="Your reply"
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

export default NewReplyModal;
