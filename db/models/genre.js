'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
  }, {});
  Genre.associate = function(models) {
    Genre.belongsToMany(models.User, { through: "User_Genres"})
  };
  return Genre;
};
