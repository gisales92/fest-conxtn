"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(25),
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      profilePicUrl: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING(50),
      },
      state: {
        type: Sequelize.STRING(15),
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING(60).BINARY,
      },
      tokenId: {
        type: Sequelize.STRING(36),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Users");
  },
};
