"use strict";
const { Model } = require("sequelize");
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
	}
	Banner.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Banner Name is Required",
					},
					notNull: {
						msg: "Banner Name is Required",
					},
				},
			},
			img_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Banner Image is Required",
					},
					notNull: {
						msg: "Banner Image is Required",
					},
					isUrl: {
						msg: "Banner Image is Invalid",
					},
				},
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notNull: {
						msg: "active or not is invalid",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Banner",
		},
	);
	return Banner;
};
