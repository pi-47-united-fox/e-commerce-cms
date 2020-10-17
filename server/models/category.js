"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.hasMany(models.Product, {
				sourceKey: "id",
				foreignKey: "CategoryId",
			});
		}
	}
	Category.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Category Name is Required",
					},
					notEmpty: {
						msg: "Category Name is Required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Category",
		},
	);
	return Category;
};
