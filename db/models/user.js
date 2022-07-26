"use strict";
const { Validator, Op } = require("sequelize");
const bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notNull: true,
          len: [3, 255],
          isEmail: true,
          isLowercase: true,
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notNull: true,
          len: [1, 255],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Username cannot be an email.");
            }
          },
        },
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [1, 20],
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          len: [1, 30],
        },
      },
      profilePicUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          len: [1, 50],
        },
      },
      state: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          len: [1, 15],
        },
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validate: {
          len: [60, 60],
        },
      },
      tokenId: {
        type: DataTypes.STRING,
      },
    },
    {}
  );

  User.associate = function (models) {
    // I'm not sure if I need this association, commenting out for now
    // User.belongsToMany(models.User, {through: models.Message, as: "sender", foreignKey: "senderId"});
    // User.belongsToMany(models.User, {through: models.Message, as: "recipient", foreignKey: "recipientId"});
  };

  User.prototype.toSafeObject = function () {
    // remember, no arrow functions
    const {
      id,
      firstName,
      lastName,
      email,
      username,
      profilePicUrl,
      city,
      state,
    } = this; // context will be the User instance
    return {
      id,
      firstName,
      lastName,
      email,
      username,
      profilePicUrl,
      city,
      state,
    };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    const user = await User.findByPk(id);
    return user.toSafeObject();
  };

  User.login = async function (credential, password ) {
    const user = await User.findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return user.toSafeObject();
    }
  };

  User.signup = async function ({ username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
    });
    return user.toSafeObject();
  };

  return User;
};
