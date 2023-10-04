import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { userSelector } from "../../store/session";
import UnauthenticatedNav from "./UnauthenticatedNav";
import AuthenticatedNav from "./AuthenticatedNav";
import "../../styles/nav.css";

const NavBar = () => {
  const sessionUser = useSelector(userSelector);
  useEffect(() => {}, []);

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="flex-row">
          <a href="/" className="homepage-link">
            <img
              className="masthead"
              src="https://res.cloudinary.com/djsh50cka/image/upload/v1660002027/logo_mockup2_uj2vgf.png"
              alt="website logo"
              crossOrigin=""
            />
          </a>
        </div>

        {sessionUser ? <AuthenticatedNav /> : <UnauthenticatedNav />}
      </div>
    </nav>
  );
};

export default NavBar;
