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
        },
        len:{
          args:[3],
          msg:'Character Must Be greater then 2'
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg:"Image URL Can't Empty"
        },
        isUrl:{
          msg:"Must Be URL Format"
        },
      }
    },
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
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Category Can't Empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};