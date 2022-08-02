const express = require("express");
const asyncHandler = require("express-async-handler");

const { Event } = require("../../db/models");

const router = express.Router();

// get user details for the user with the given userId
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const events = await Event.findAll();
    res.status(200);
    return res.json({ events });
  })
);

module.exports = router;
