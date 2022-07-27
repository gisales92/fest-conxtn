"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Genre = sequelize.define(
    "User_Genre",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {}
  );
  User_Genre.associate = function (models) {
    // associations can be defined here
  };
  return User_Genre;
};
