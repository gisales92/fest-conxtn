const express = require("express");
const asyncHandler = require("express-async-handler");

const { User } = require("../../db/models");

const router = express.Router();

router.get(
  "/:userId",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await User.getUserById(userId);
      res.status(200);
      return res.json({ ...user });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "User couldn't be found",
        statusCode: 404,
      });
    }
  })
);

module.exports = router;
