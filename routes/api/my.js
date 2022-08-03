const express = require("express");
const asyncHandler = require("express-async-handler");

const { Post, Reply, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateReply } = require("../../utils/validation");

const router = express.Router();

// get all genres that have been subscribed to by the current User.
router.get(
  "/genres",
  requireAuth,
  asyncHandler(async function (req, res, next) {


  })
);

module.exports = router;