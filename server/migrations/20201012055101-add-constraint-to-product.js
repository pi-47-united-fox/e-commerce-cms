"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint("Products", {
			fields: ["CategoryId"],
			type: "foreign key",
			name: "Fkey_Categories_Products",
			references: {
				table: "Categories",
				field: "id",
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint("Products", "Fkey_Categories_Products", {});
	},
};
