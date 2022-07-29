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
        eventId: 22,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 24,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 20,
        rsvpId: 1,
      }),
      r({
        userId: 1,
        eventId: 14,
        rsvpId: 2,
      }),
      r({
        userId: 1,
        eventId: 15,
        rsvpId: 2,
      }),
      r({
        userId: 2,
        eventId: 4,
        rsvpId: 1,
      }),
      r({
        userId: 2,
        eventId: 9,
        rsvpId: 2,
      }),
      r({
        userId: 2,
        eventId: 15,
        rsvpId: 2,
      }),
      r({
        userId: 2,
        eventId: 21,
        rsvpId: 2,
      }),
      r({
        userId: 3,
        eventId: 1,
        rsvpId: 1,
      }),
      r({
        userId: 3,
        eventId: 10,
        rsvpId: 2,
      }),
      r({
        userId: 3,
        eventId: 16,
        rsvpId: 2,
      }),
      r({
        userId: 3,
        eventId: 22,
        rsvpId: 2,
      }),
      r({
        userId: 4,
        eventId: 5,
        rsvpId: 1,
      }),
      r({
        userId: 4,
        eventId: 11,
        rsvpId: 2,
      }),
      r({
        userId: 4,
        eventId: 16,
        rsvpId: 2,
      }),
      r({
        userId: 4,
        eventId: 23,
        rsvpId: 2,
      }),
      r({
        userId: 5,
        eventId: 2,
        rsvpId: 1,
      }),
      r({
        userId: 5,
        eventId: 12,
        rsvpId: 2,
      }),
      r({
        userId: 5,
        eventId: 17,
        rsvpId: 2,
      }),
      r({
        userId: 5,
        eventId:3,
        rsvpId: 2,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User_Events");
  },
};
