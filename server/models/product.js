"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			Product.belongsTo(models.Category, {
				targetKey: "id",
				foreignKey: "CategoryId",
			});
		}
	}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Product Name is Required",
					},
					notNull: {
						msg: "Product Name is Required",
					}
				},
			},
			img_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Product Image is Required",
					},
					notNull: {
						msg: "Product Image is Required",
					},
					isUrl: {
						msg: "Product Image is Invalid",
					},
				},
			},
			price: {
				type: DataTypes.REAL,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Product Price is Required",
					},
					min: {
						args: 100,
						msg: "Minimum price is Rp 100,00",
					},
				},
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Product Stock is Required",
					},
					min: {
						args: 1,
						msg: "Minimum product stock is 1",
					},
				},
			},
			CategoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Product Category is Required",
					},
					min: {
						args: 1,
						msg: "Category id is one minimum",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Product",
		},
	);
	return Product;
};
