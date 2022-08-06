import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, login } from "../../store/session";
import { showModal, hideModal } from "../../store/ui";
import { SIGNUP_MODAL } from "./SignupModal";

export const LOGIN_MODAL = "ui/modals/LOGIN";

const LoginModal = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const getEmailError = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    return "";
  };

  const getPasswordError = () => (password ? "" : "Password is required");

  useEffect(() => {
    if (hasSubmitted) {
      setEmailError(getEmailError());
      setPasswordError(getPasswordError());

      // parse errors obj
      const errObj = errors.reduce((obj, error) => {
        error = error.split(" : ");
        obj[error[0]] = error[1];
        return obj;
      }, {});

      if (errObj.email) setEmailError(errObj.email);
      else if (errObj.password) setPasswordError(errObj.password);
    }
  }, [email, password, hasSubmitted, errors]);

  // if user is logged in hide the modal
  if (user) {
    dispatch(hideModal());
    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // front end validations
    const emailValidationError = getEmailError();
    const passwordValidationError = getPasswordError();

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    // if there are errors dont make request
    if (!emailValidationError && !passwordValidationError) {
      // perform login
      const data = await dispatch(login(email.toLowerCase(), password));
      if (data) setErrors(data);
    }
  };

  const populateDemoUserFields = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  return (
    <div className="login-modal">
      <h1 className="form-header">Log in</h1>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="jason.smith@example.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="field-error">
            {emailError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="field-error">
            {passwordError}
          </label>
        </div>

        <button type="submit" className="form-submit-button">
          Submit
        </button>
      </form>

      <div className="modal-footer">
        <p>
          Don't have an account yet?{" "}
          <a
            className="text-link"
            onClick={() => dispatch(showModal(SIGNUP_MODAL))}
          >
            Sign up.
          </a>
        </p>
        <p>
          Just looking around?{" "}
          <a className="text-link" onClick={populateDemoUserFields}>
            Log in as a demo user.
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
