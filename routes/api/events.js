const express = require("express");
const asyncHandler = require("express-async-handler");

const { Event, Genre } = require("../../db/models");

const router = express.Router();

// get user details for the user with the given userId
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const events = await Event.findAll({
      include: Genre,
    });
    const parsedEvents = [];
    const attributes = [
      "id",
      "name",
      "url",
      "startDate",
      "endDate",
      "venueName",
      "address",
      "city",
      "state",
      "zipCode",
      "mainPicUrl",
      "description",
      "link",
    ];
    events.forEach((eventObj) => {
      const event = {};
      attributes.forEach((key) => {
        event[key] = eventObj[key];
      });
      event.genre = eventObj.Genre.type;
      parsedEvents.push(event);
    });
    res.status(200);
    return res.json({ events: parsedEvents });
  })
);

module.exports = router;
