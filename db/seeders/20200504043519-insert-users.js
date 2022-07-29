"use strict";

const bcrypt = require("bcryptjs");

function createPassword() {
  return bcrypt.hashSync("password");
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      r({
        email: "demo@example.com",
        username: "Demo-lition",
        firstName: "Demo",
        lastName: "McUser",
        profilePicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658976281/concert-3084876_960_720_alhnbw.jpg",
        city: "Los Angeles",
        state: "California",
        hashedPassword: createPassword(),
      }),
      r({
        email: "luffy@example.com",
        username: "Strawhat_Luffy",
        firstName: "Luffy",
        lastName: "Monkey",
        profilePicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658975328/straw-hat-jolly-roger-joaks_t3w08o.jpg",
        city: "New York",
        state: "New York",
        hashedPassword: createPassword(),
      }),
      r({
        email: "subaru@example.com",
        username: "re:Zero",
        firstName: "Subaru",
        lastName: "Natsuki",
        profilePicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658975486/36f9c4b5813cb22aba08466fda544e27_kyrj2m.png",
        city: "San Francisco",
        state: "California",
        hashedPassword: createPassword(),
      }),
      r({
        email: "moist@example.com",
        username: "penguinz0",
        firstName: "Charles",
        lastName: "White",
        city: "Tampa",
        state: "Florida",
        hashedPassword: createPassword(),
      }),
      r({
        email: "yoshi@example.com",
        username: "YoshDragon",
        firstName: "Yoshi",
        lastName: "Munchakoopas",
        profilePicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658976130/Yoshi__Nintendo_character_sqgcko.png",
        hashedPassword: createPassword(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users");
  },
};
