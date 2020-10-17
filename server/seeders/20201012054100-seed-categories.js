"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Categories",
			[
				{
					name: "Fashion",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Computer & Laptop",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "HandPhone & Tablet",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Makanan & Minuman",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Categories", null, {});
	},
};
