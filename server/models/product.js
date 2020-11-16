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
          msg: 'name must be filled'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'image must be filled'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'price must be filled'
        },
        min: {
          args: [0],
          msg: 'price must be positive value'
        },
      }
    },
    stock: {
      type: DataTypes.STRING,
      validate: {
        min: {
          notEmpty: {
            args: true,
            msg: 'stock must be filled'
          },
          args: [0],
          msg: 'price must be positive value'
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'category must be filled'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.stock = 1
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};