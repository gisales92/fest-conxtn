"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 100],
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      venueName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mainPicUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );
  Event.associate = function (models) {
    Event.belongsTo(models.Genre);
    Event.belongsToMany(models.User, {
      through: "User_Events",
      foreignKey: "eventId",
      otherKey: "userId",
    });
  };
  return Event;
};
