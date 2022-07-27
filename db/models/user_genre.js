"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Genres = sequelize.define(
    "User_Genres",
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
  return User_Genres;
};
