"use strict";
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {}
  );
  Genre.associate = function (models) {
    Genre.belongsToMany(models.User, {
      through: "User_Genres",
      foreignKey: "genreId",
      otherKey: "userId",
    });
    Genre.hasMany(models.Event, { foreignKey: "genreId" });
  };
  return Genre;
};
