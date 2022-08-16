import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import { showModal, hideModal } from "../../store/ui";
import { LOGIN_MODAL } from "./LoginModal";
import { updateReply, focusReplySelector } from "../../store/replies";

export const EDIT_REPLY_MODAL = "ui/modals/EDIT_REPLY_MODAL";

const EditReplyModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const reply = useSelector(focusReplySelector);
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState(reply.body);
  const [bodyError, setBodyError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const replyId = reply.id;

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
      // submit the reply
      const reply = { replyId, body };
      const data = await dispatch(updateReply(reply));
      if (data.message) {
        setErrors([data.message]);
      } else {
        dispatch(hideModal());
      }
    }
  };

  return (
    <div className="new-post-modal">
      <h1 className="form-header">Edit Reply</h1>

      <form onSubmit={onSubmit}>

        <div className="form-row">
          <label htmlFor="body">Reply body</label>
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

export default EditReplyModal;