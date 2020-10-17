'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    title: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (instance) => {
        if (instance.isActive == '') {
          instance.isActive = true
        }
      }
    },
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};