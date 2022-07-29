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
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User_Genres");
  },
};
