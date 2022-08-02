const express = require("express");
const asyncHandler = require("express-async-handler");
const { validateLogin, validateSignup } = require("../../utils/validation");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models/");
const router = express.Router();

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
    const safeUser = user.toSafeObject();
    safeUser.token = token;

    return res.json({
      ...safeUser,
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
      ...userObj,
    });
  } else {
    next();
  }
});

// Sign up
router.post(
  "/signup",
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;

    const user = await User.signup({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if (!user) {
      const err = new Error("Sign up error");
      err.status = 401;
      err.title = "Sign up failed";
      err.errors = [
        "The provided information could not be used to create a user",
      ];
      next(err);
      return err;
    }

    const token = await setTokenCookie(res, user);

    res.status(200);
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token
    })
  })
);

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
