import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LOGIN_MODAL } from "./LoginModal";
import { showModal } from "../../store/ui";
import { userSelector } from "../../store/session";
import { createReply } from "../../store/replies";
import "../../styles/modals.css";

const NewReplyModal = ({ postId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector(userSelector);

  const getBodyError = () => (body ? "" : "A reply body is required");
  // close modal when clicked outside it
  const closeModal = (e) => {
    document.querySelector("body").style.overflow = "auto";
    setVisible(false);
  };
  // stop propagation when click inside modal
  const onModalClick = (e) => e.stopPropagation();

  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (hasSubmitted) {
      setBodyError(getBodyError());
    }
  }, [body, hasSubmitted, errors, user]);

  useEffect(() => {
    // if user is not logged , direct to the login modal
    if (!user) {
      setVisible(false);
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
      const reply = { userId: user.id, postId, body };
      const data = await dispatch(createReply(reply));
      if (data.message) {
        setErrors([data.message]);
      } else {
        closeModal();
      }
    }
  };

  return visible ? (
    <div className="modal-overlay" onMouseDown={closeModal}>
      <div className="modal" onMouseDown={onModalClick}>
        <div className="modal-close" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="xl" className="icon" />
        </div>

        <div className="new-reply-modal">
          <form onSubmit={onSubmit}>
            <h1 className="form-header">Create Reply</h1>
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
      </div>
    </div>
  ) : null;
};

export default NewReplyModal;
