import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, signUp } from "../../store/session";
import { showModal, hideModal } from "../../store/ui";
import { LOGIN_MODAL } from "./LoginModal";

export const SIGNUP_MODAL = "ui/modals/SIGNUP";

const SignupModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateFirstName = () => {
    let errorMessage = "";
    if (!firstName) errorMessage = "First name is required";
    else if (firstName.length > 20)
      errorMessage = "First name must be fewer than 20 characters";
    setFirstNameError(errorMessage);
    return errorMessage === "";
  };

  const validateLastName = () => {
    let errorMessage = "";
    if (!lastName) errorMessage = "Last name is required";
    else if (lastName.length > 30)
      errorMessage = "Last name must be fewer than 30 characters";
    setLastNameError(errorMessage);
    return errorMessage === "";
  };

  const validateUsername = () => {
    let errorMessage = "";
    if (!username) errorMessage = "Username is required";
    else if (username.length < 4)
      errorMessage = "Username must be at least 4 characters";
    else if (username.length > 25)
      errorMessage = "Username must be fewer than 25 characters";
    setUsernameError(errorMessage);
    return errorMessage === "";
  };

  const validateEmail = () => {
    let errorMessage = "";
    if (!email) errorMessage = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errorMessage = "Please enter a valid email";
    setEmailError(errorMessage);
    return errorMessage === "";
  };

  const validatePassword = () => {
    let errorMessage = "";
    if (!password) errorMessage = "Password is required";
    else if (password.length < 6)
      errorMessage = "Password must be at least 6 characters";
    else if (password.length > 128)
      errorMessage = "Password must be fewer than 128 characters";
    setPasswordError(errorMessage);
    return errorMessage === "";
  };

  const validateConfirmPassword = () => {
    let errorMessage = "";
    if (!confirmPassword) errorMessage = "Please re-enter your password";
    else if (confirmPassword !== password)
      errorMessage = "Passwords do not match";
    setConfirmPasswordError(errorMessage);
    return errorMessage === "";
  };

  useEffect(() => {
    if (hasSubmitted) {
      validateFirstName();
      validateLastName();
      validateUsername();
      validateEmail();
      validatePassword();
      validateConfirmPassword();

      // parse backend errors obj
      console.log("Errors: ", errors);
      if (errors.message) setErrorMsg(errors.message);
      if (errors.errors?.email) setEmailError(errors.errors.email);
      if (errors.errors?.username) setUsernameError(errors.errors.username);
    }
  }, [
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    hasSubmitted,
    errors,
    errorMsg,
  ]);

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
    const validations = [
      validateFirstName(),
      validateLastName(),
      validateEmail(),
      validatePassword(),
      validateConfirmPassword(),
    ];

    // if there are no errors make request
    if (!validations.includes(false)) {
      const data = await dispatch(
        signUp(firstName, lastName, username, email.toLowerCase(), password)
      );
      if (data) {
        setErrors(data);
      } else {
        dispatch(hideModal());
      }
    }
  };

  return (
    <div className="signup-modal">
      <h1 className="form-header">Sign up</h1>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="firstName">First name</label>
          <input
            name="firstName"
            type="text"
            placeholder="Jason"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="firstName" className="field-error">
            {firstNameError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Last name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="lastName" className="field-error">
            {lastNameError}
          </label>
        </div>

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
          <label htmlFor="email">Username</label>
          <input
            name="username"
            type="text"
            placeholder="coolDood1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username" className="field-error">
            {usernameError}
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className="field-error">
            {confirmPasswordError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="submit" className="field-error">
            {errorMsg}
          </label>
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </div>
      </form>

      <div className="modal-footer">
        <p>
          Already have an account?{" "}
          <span
            className="text-link"
            onClick={() => dispatch(showModal(LOGIN_MODAL))}
          >
            Log in.
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
