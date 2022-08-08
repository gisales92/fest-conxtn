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
            src="//cdn.otstatic.com/cfe/9/images/opentable-logo-153e80.svg"
            alt="website logo"

          />
        </a>

        <div className="nav-location">
          <nav>
            <FontAwesomeIcon icon={faCompass} size="lg" className="icon"/>
          </nav>
        </div>
      </div>


      {sessionUser ? <AuthenticatedNav /> : <UnauthenticatedNav />}

    </nav>
  );
};

export default NavBar;
