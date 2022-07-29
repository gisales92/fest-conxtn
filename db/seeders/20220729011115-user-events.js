"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("User_Events", [
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 3,
        rsvpId: 1,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User_Events");
  },
};
