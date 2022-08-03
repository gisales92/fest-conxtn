const express = require("express");
const asyncHandler = require("express-async-handler");

const { Post, Reply, User, Genre } = require("../../db/models");
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

module.exports = router;