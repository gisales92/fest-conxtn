import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../store/session";

const AuthenticatedNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
        await dispatch(logout());
        history.push("/")
  };

  return (
    <div className="flex-row nav-links">
      <button
        className="nav-button hover-effect logout-button"
        onClick={onLogout}
      >
        <span>Log out</span>
        <FontAwesomeIcon icon={faArrowRightToBracket} className="icon" />
      </button>
      <Link to="/profile" id="profile-button">
        <button className="nav-button hover-effect">
          <span>Profile</span>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
      </Link>
    </div>
  );
};

export default AuthenticatedNav;
