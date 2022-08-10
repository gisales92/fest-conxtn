import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, login } from "../../store/session";
import { showModal, hideModal } from "../../store/ui";
import { SIGNUP_MODAL } from "./SignupModal";

export const LOGIN_MODAL = "ui/modals/LOGIN";

const LoginModal = () => {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const getCredentialError = () => {
    if (!credential) return "A valid username or email is required";
    return "";
  };

  const getPasswordError = () => (password ? "" : "Password is required");

  useEffect(() => {
    if (hasSubmitted) {
      setCredentialError(getCredentialError());
      setPasswordError(getPasswordError());
    }
  }, [credential, password, hasSubmitted, errors, user]);

  useEffect(() => {
    // if user is logged in hide the modal
    if (user) {
      dispatch(hideModal());
      return null;
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // front end validations
    const credentialValidationError = getCredentialError();
    const passwordValidationError = getPasswordError();

    setCredentialError(credentialValidationError);
    setPasswordError(passwordValidationError);

    // if there are errors dont make request
    if (!credentialValidationError && !passwordValidationError) {
      // perform login
      const data = await dispatch(login(credential, password));
      if (data.message) {
        setErrors([data.message]);
      } else {
        dispatch(hideModal());
      }
    }
  };

  const populateDemoUserFields = () => {
    setCredential("Demo-lition");
    setPassword("password");
  };

  return (
    <div className="login-modal">
      <h1 className="form-header">Log in</h1>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="credential">Username or Email</label>
          <input
            name="credential"
            type="text"
            placeholder="jason.smith@example.co"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          <label htmlFor="credential" className="field-error">
            {credentialError}
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

        <div className="form-row">
          <label htmlFor="submit" className="field-error">
            {errors}
          </label>
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </div>
      </form>

      <div className="modal-footer">
        <p>
          Don't have an account yet?{" "}
          <span
            className="text-link"
            onClick={() => dispatch(showModal(SIGNUP_MODAL))}
          >
            Sign up.
          </span>
        </p>
        <p>
          Just looking around?{" "}
          <span className="text-link" onClick={populateDemoUserFields}>
            Log in as a demo user.
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
