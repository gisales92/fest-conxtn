import React from "react";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";

import { userSelector } from "../../store/session";
import UnauthenticatedNav from "./UnauthenticatedNav";
import AuthenticatedNav from "./AuthenticatedNav";

const NavBar = () => {
  const sessionUser = useSelector(userSelector);

  return (
    <nav className="nav-header">
      <div className="flex-row">
        <a href="/" className="homepage-link">
          <img
            className="masthead"
            src="https://res.cloudinary.com/djsh50cka/image/upload/v1660002027/logo_mockup2_uj2vgf.png"
            alt="website logo"
            crossOrigin=""
          />
        </a>

        <div className="nav-location">
          <nav>
            <FontAwesomeIcon icon={faCompass} size="lg" className="icon" />
          </nav>
        </div>
      </div>

      {sessionUser ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </nav>
  );
};

export default NavBar;
