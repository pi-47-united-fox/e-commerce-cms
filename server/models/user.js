'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

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
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be email'
        },
        notEmpty: true,
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          len: [6],
          msg: "Password must have at least 6 characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, option){
        user.password = bcrypt.hashSync(user.password, 8)
        if(user.email === 'admin@mail.com'){
          user.role = 'admin'
        } else {
          user.role = 'customer'
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};