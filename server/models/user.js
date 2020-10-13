'use strict';
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
      unique: true,
      validate:{
        isEmail:{
          args: true,
          msg: 'Must be email Format'
        },
        notEmpty:{
          msg: "Email cannot empty"
        },
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Password cannot empty"
        },
        len:{
          args: [3],
          msg: "Please use at least 3 characters"
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