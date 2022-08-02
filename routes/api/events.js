const express = require("express");
const asyncHandler = require("express-async-handler");

const { Event, Genre } = require("../../db/models");

const router = express.Router();

// get all events
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

// get details of an event by its eventId
router.get(
  "/:eventId",
  asyncHandler(async function (req, res, next) {
    const eventId = req.params.eventId;
    try {
      const event = await Event.findByPk(eventId, {
        include: Genre,
      });
      const parsedEvent = {};
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

      attributes.forEach((key) => {
        parsedEvent[key] = event[key];
      });
      parsedEvent.genre = event.Genre.type;

      res.status(200);
      return res.json({ ...parsedEvent });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });
    }
  })
);

module.exports = router;
