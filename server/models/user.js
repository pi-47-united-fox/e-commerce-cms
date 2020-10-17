'use strict';
const {
  Model
} = require('sequelize');

const {getHash} =require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : 'name must filled'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email must filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email must filled'
        },
        len: [6,20],
        msg: 'password min 6-20 character'
      }
    },
  }, {
    hooks: {
      beforeCreate(instance, option){
        instance.password = getHash(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};