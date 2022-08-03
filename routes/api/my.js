const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { Post, Reply, User, Genre, User_Genres } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateReply } = require("../../utils/validation");

const router = express.Router();

// get all genres that have been subscribed to by the current User.
router.get(
  "/genres",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    // grab userId from the req.user object, use it to retrieve that user's record and include their genres
    const userId = req.user.id;
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
  })
);

// subscribe to a genre
router.post(
  "/genres",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    // grab userId from the req.user object, use check to make sure it matches the userId from the req body
    const id = req.user.id;
    const { userId, genreId } = req.body;
    if (id !== userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // check to make sure it's a valid genre
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      res.status(404);
      res.json({
        message: "Unable to find a Genre with that ID",
        statusCode: 404,
      });
    }
    // check to make sure user is not already subscribed to that genre to prevent duplicates
    const userGenre = await User_Genres.findOne({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: userId,
            },
          },
          {
            genreId: {
              [Op.eq]: genreId,
            },
          },
        ],
      },
    });
    if (userGenre) {
      res.status(200);
      return res.json({
        message: "Already subscribed",
        statusCode: 200,
      });
    }
    // create the new record on the User_Genres table format the response
    const newGenreSub = await User_Genres.create({
      userId,
      genreId,
    });
    const subbedGenre = {};
    subbedGenre.id = newGenreSub.id;
    subbedGenre.userId = newGenreSub.userId;
    subbedGenre.genre = {
      id: genre.id,
      type: genre.type,
    };
    res.status(201);
    return res.json({ ...subbedGenre });
  })
);

module.exports = router;
