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
          args: true,
          msg: "Product name cannot be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Price must be number"
        },
        min: {
          args: [0],
          msg: "Price must be positive"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Stock must be number"
        },
        min: {
          args: [0],
          msg: "Stock must be positive"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};