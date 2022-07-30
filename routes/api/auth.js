const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models/user");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateLogin = [
  check("credential") // can check credential to check both email and username
    .exists({ checkFalsy: true })
    .withMessage("A valid email or username is required")
    .notEmpty()
    .withMessage("A valid email or username is required")
    .isEmail()
    .withMessage("A valid email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Log in
router.post(
  "/session",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login(credential, password);

    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      next(err);
      return err;
    }

    const token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    });
  })
);

// Restore session user
router.get("/session", requireAuth, (req, res, next) => {
  const { user } = req;
  if (user) {
    res.status(200);
    const userObj = user.toSafeObject();
    return res.json({
      userObj,
    });
  } else {
    next();
    // res.status(401);
    // return res.json({});
  }
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
