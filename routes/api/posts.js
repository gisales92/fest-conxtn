const express = require("express");
const asyncHandler = require("express-async-handler");

const { Post, Reply } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// get all replies that have been made on a post specified by its postId
router.get(
  "/:postId/replies",
  asyncHandler(async function (req, res, next) {
    const postId = req.params.postId;
  })
);

module.exports = router;