import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../store/session";


const AuthenticatedNav = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => await dispatch(logout());

  return (
    <div className="flex-row nav-links">
      <button
        className="nav-button hover-effect logout-button"
        onClick={onLogout}
      >
        <span>Log out</span>
        <FontAwesomeIcon icon={faArrowRightToBracket} className="icon" />
      </button>
{/* Fill in link to user profile URL when that component is completed */}
      <Link to="/">
        <button
        className="nav-button hover-effect"
        >
          <span>Profile</span>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
      </Link>
    </div>
  );
};

export default AuthenticatedNav;
