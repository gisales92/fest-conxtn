const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { User, Genre, Event, Post, User_Events } = require("../../db/models");

const router = express.Router();

// get user details for the user with the given userId
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
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

// get the genres subscribed to by the user with the given userId
router.get(
  "/:userId/genres",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await User.findByPk(userId, {
        include: Genre,
      });
      const genres = user.Genres;
      // got to remove extra data like createdAt, updatedAt, and the user_genre join table info
      userGenres = genres.map((genreObj) => {
        const genre = {};
        genre.id = genreObj.id;
        genre.type = genreObj.type;
        return genre;
      });
      res.status(200);
      return res.json({ genres: userGenres });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

// get the events RSVP'd to by the user with the given userId
router.get(
  "/:userId/events",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await Event.findByPk(3);
      // const events = user.Events;
      // got to remove extra data like createdAt, updatedAt, and the user_genre join table info
      return res.json({ user });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

module.exports = router;
