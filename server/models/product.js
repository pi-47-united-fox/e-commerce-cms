'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please insert a name."
        }
      }
    },
    image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Please insert a url link."
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          msg: "Please input number only."
        },
        min:{
          args: [1],
          msg: "Please input number greater than zero."
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric:{
          msg: "Please input number only."
        },
        min:{
          args: [0],
          msg: "Please input positive value."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};