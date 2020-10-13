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
          msg: "Name Can't Empty"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 100,
        notEmpty: {
          msg: "Price Can't Empty"
        },
        isInt: {
          msg: "Must be an integer number"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        notEmpty: {
          msg: "Stock Can't Empty"
        },
        isInt: {
          msg: "Must be an integer number"
        }
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};