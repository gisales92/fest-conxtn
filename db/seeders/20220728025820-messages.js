"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      r({
        senderId: 2,
        recipientId: 1,
        body: "Hey! Do you want to join my crew?",
        read: true,
      }),
      r({
        senderId: 1,
        recipientId: 2,
        body: "Where do I sign up?",
      }),
      r({
        senderId: 1,
        recipientId: 4,
        body: "Are you cr1TiKal from YouTube?",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Messages");
  },
};
