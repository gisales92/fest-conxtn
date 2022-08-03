const express = require("express");
const asyncHandler = require("express-async-handler");

const { Genre } = require("../../db/models");

const router = express.Router();

// get user details for the user with the given userId
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
   const genres = await Genre.findAll();
   const filteredGenres = [];
   genres.forEach(genreObj => {{
    const genre = {};
    genre.id = genreObj.id;
    genre.type = genreObj.type;
    filteredGenres.push(genre);
   }})
   res.status(200);
   res.json({ genres: filteredGenres })
  })
);

module.exports = router;
