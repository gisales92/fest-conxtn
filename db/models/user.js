"use strict";
const { Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notNull: true,
          len: [3, 255],
          isEmail: true,
          isLowercase: true,
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notNull: true,
          len: [1, 255],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Username cannot be an email.");
            }
          },
        },
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [1, 20],
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [1, 30],
        },
      },
      profilePicUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validate: {
          len: [60, 60],
        },
      },
      tokenId: {
        type: DataTypes.STRING,
      },
    },
    {}
  );

  User.associate = function (models) {};

  return User;
};
