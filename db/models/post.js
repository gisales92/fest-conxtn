"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 100],
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 1000],
        },
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User);
    Post.belongsTo(models.Event);
    Post.hasMany(models.Reply);
  };
  return Post;
};
