"use strict";
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define(
    "RSVP",
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
  RSVP.associate = function (models) {
    // associations can be defined here
    RSVP.belongsTo(models.User_Events);
  };
  return RSVP;
};
