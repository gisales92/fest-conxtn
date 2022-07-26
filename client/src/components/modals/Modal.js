import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { modalSelector, hideModal } from "../../store/ui";
import LoginModal, { LOGIN_MODAL } from "./LoginModal";
import SignupModal, { SIGNUP_MODAL } from "./SignupModal";
import NewPostModal, { NEW_POST_MODAL } from "./NewPostModal";
import NewReplyModal, { NEW_REPLY_MODAL } from "./NewReplyModal";
import EditGenresModal, { EDIT_GENRES_MODAL } from "./EditGenresModal";
import EditPostModal, { EDIT_POST_MODAL } from "./EditPostModal";
import EditReplyModal, { EDIT_REPLY_MODAL } from "./EditReplyModal";
import "../../styles/modals.css";
import "../../styles/forms.css";

const Modal = () => {
  const dispatch = useDispatch();

  // close modal when clicked outside it
  const closeModal = (e) => dispatch(hideModal());
  // stop propagation when click inside modal
  const onModalClick = (e) => e.stopPropagation();

  const modalId = useSelector(modalSelector);

  let modalToRender;
  switch (modalId) {
    case LOGIN_MODAL:
      modalToRender = <LoginModal />;
      break;
    case SIGNUP_MODAL:
      modalToRender = <SignupModal />;
      break;
    case NEW_POST_MODAL:
      modalToRender = <NewPostModal />;
      break;
    case NEW_REPLY_MODAL:
      modalToRender = <NewReplyModal />;
      break;
    case EDIT_GENRES_MODAL:
      modalToRender = <EditGenresModal />;
      break;
    case EDIT_POST_MODAL:
      modalToRender = <EditPostModal />;
      break;
    case EDIT_REPLY_MODAL:
      modalToRender = <EditReplyModal />;
      break;
    default:
      closeModal();
      return null;
  }

  return (
    <div className="modal-overlay" onMouseDown={closeModal}>
      <div className="modal" onMouseDown={onModalClick}>
        <div className="modal-close" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="xl" className="icon" />
        </div>

        {modalToRender}
      </div>
    </div>
  );
};

export default Modal;
