'use strict';
const {hashPassword} = require('../helpers/bcrypt')
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
      type:DataTypes.STRING,
      validate: {
        isEmail:{
          msg:"Please insert an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args:[6,],
          msg: "Use at least 6 characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    if(user.role !== 'admin'){
      user.role = 'customer'
    }
    user.password = hashPassword(user.password)
  })
  return User;
};