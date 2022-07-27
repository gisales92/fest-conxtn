'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Genre = sequelize.define('User_Genre', {
    userId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {});
  User_Genre.associate = function(models) {
    // associations can be defined here
  };
  return User_Genre;
};