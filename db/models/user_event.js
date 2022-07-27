"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Events = sequelize.define(
    "User_Events",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      rsvpId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {}
  );
  User_Events.associate = function (models) {
    // associations can be defined here
    User_Events.hasOne(models.RSVP, { foreignKey: "rsvpId" });
  };
  return User_Events;
};
