"use strict";

const { encryptPassword } = require("../helpers/bcrypt");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "admin@mail.com",
					password: encryptPassword("1234"),
					display_name: "Admin",
					is_admin: true,
					img_url: "https://avatars.dicebear.com/api/male/AdminCMS.svg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					email: "user1@mail.com",
					password: encryptPassword("1234"),
					display_name: "User 1",
					is_admin: false,
					img_url: "https://avatars.dicebear.com/api/male/User1CMS.svg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
