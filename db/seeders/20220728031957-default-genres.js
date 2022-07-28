"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Genres", [
      r({
        type: "House",
      }),
      r({
        type: "Techno",
      }),
      r({
        type: "EDM",
      }),
      r({
        type: "Indie",
      }),
      r({
        type: "Bass",
      }),
      r({
        type: "Hip Hop & Rap",
      }),
      r({
        type: "Trance",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Genres");
  },
};
