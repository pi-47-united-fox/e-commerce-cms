"use strict";

const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						msg: "Email is Invalid",
					},
					notNull: {
						msg: "Email is Required",
					},
					notEmpty: {
						msg: "Email is Required",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password is Required",
					},
					notEmpty: {
						msg: "Password is Required",
					},
				},
			},
			display_name: DataTypes.STRING,
			is_admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notNull: {
						msg: "if User is Admin cannot be detemined",
					},
				},
			},
			img_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Profile Picture is Required",
					},
					notEmpty: {
						msg: "Profile Picture is Required",
					},
					isUrl: {
						msg: "Profile Picture is Invalid",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate(user) {
					user.password = encryptPassword(user.password);
					user.is_admin = false;
				},
			},
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
