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
          len: [1, 50]
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
        allowNull: false,
        validate: {
          notEmpty: false,
          len: [1, 100]
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
          len: [1, 100]
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          validate: {
            notEmpty: false,
            len: [1, 100]
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          validate: {
            notEmpty: false,
            len: [1, 100]
          },
        },
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
          len: [1, 6]
        },
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      lng: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
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
          len: [1, 500],
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
    Event.belongsTo(models.Genre, {foreignKey: "genreId"});
    Event.belongsToMany(models.User, {
      through: "User_Events",
      foreignKey: "eventId",
      otherKey: "userId",
    });
    Event.hasMany(models.Post, {foreignKey: "eventId"});
  };
  return Event;
};
