"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("User_Genres", [
      r({
        userId: 1,
        genreId: 1,
      }),
      r({
        userId: 1,
        genreId: 3,
      }),
      r({
        userId: 2,
        genreId: 3,
      }),
      r({
        userId: 2,
        genreId: 6,
      }),
      r({
        userId: 3,
        genreId: 2,
      }),
      r({
        userId: 3,
        genreId: 1,
      }),
      r({
        userId: 3,
        genreId: 3,
      }),
      r({
        userId: 5,
        genreId: 1,
      }),
      r({
        userId: 5,
        genreId: 2,
      }),
      r({
        userId: 5,
        genreId: 4,
      }),
      r({
        userId: 5,
        genreId: 6,
      }),
      r({
        userId: 5,
        genreId: 7,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User_Genres");
  },
};
