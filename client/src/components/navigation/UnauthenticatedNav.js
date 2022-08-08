import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { showModal } from "../../store/ui";
import { LOGIN_MODAL } from "../modals/LoginModal";
import { SIGNUP_MODAL } from "../modals/SignupModal";

const UnauthenticatedNav = () => {
  const dispatch = useDispatch();

  const openLoginModal = (e) => dispatch(showModal(LOGIN_MODAL));

  const openSignupModal = () => dispatch(showModal(SIGNUP_MODAL));

  return (
    <div className="flex-row nav-links">
        <button className="nav-button hover-effect login-button" onClick={openLoginModal}>
          Log in
          <FontAwesomeIcon icon={faArrowRightToBracket} className="icon"/>
        </button>

        <button className="nav-button hover-effect sign-up-button" onClick={openSignupModal}>
          <span>Sign up</span>
          <FontAwesomeIcon icon={faUserPlus} className="icon"/>
        </button>
    </div>
  );
};

export default UnauthenticatedNav;
