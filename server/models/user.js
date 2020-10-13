'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be a valid email'
        },
        allowNull: {
          args: false,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4],
          msg: 'Password must be at least 4 characters'
        },
        allowNull: {
          args: false,
          msg: 'Password cannot be empty'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};