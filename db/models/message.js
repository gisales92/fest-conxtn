"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: [1, 1000],
        }
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );
  Message.associate = function (models) {
    Message.belongsTo(models.User, {as: "sender", foreignKey: "senderId"});
    Message.belongsTo(models.User, {as: "recipient", foreignKey: "recipientId"});
  };
  return Message;
};
