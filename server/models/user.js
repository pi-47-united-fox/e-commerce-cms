'use strict';
const bcrypt = require("bcryptjs")
const {
  Model
} = require('sequelize');
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
      allowNull: false,
      unique: {
        argv:true,
        msg:"email is already in used"
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'customer'
    }
  }, {
    hooks:{
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 8)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};