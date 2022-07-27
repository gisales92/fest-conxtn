"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Event = sequelize.define(
    "User_Event",
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
  User_Event.associate = function (models) {
    // associations can be defined here
  };
  return User_Event;
};
