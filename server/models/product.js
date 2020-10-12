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
        notEmpty: true
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        if (instance.image_url == '' || instance.image_url == null) {
          instance.image_url = 'https://intersections.humanities.ufl.edu/wp-content/uploads/2020/07/112815904-stock-vector-no-image-available-icon-flat-vector-illustration-1.jpg'
        }
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};