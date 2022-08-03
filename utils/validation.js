const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => {
      if (!errors[`${error.param}`]) {
        errors[`${error.param}`] = error.msg;
      }
    });

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateLogin = [
  check("credential") // can check credential to check both email and username
    .exists({ checkFalsy: true })
    .withMessage("A valid email or username is required")
    .notEmpty()
    .withMessage("A valid email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("A first name is required")
    .isLength({ min: 1, max: 20 })
    .withMessage("First name must be between 1 and 20 characters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("A last name is required")
    .isLength({ min: 1, max: 30 })
    .withMessage("Last name must be between 1 and 30 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email."),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please provide a username between 1 and 25 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const validatePost = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title for your post")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a body for your post")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Body must be between 1 and 1000 characters"),
  handleValidationErrors,
];

const validateReply = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a body for your reply")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Body must be between 1 and 1000 characters"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validatePost,
  validateReply,
};
