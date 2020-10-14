'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'Uncategorized',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Sepatu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Baju',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Celana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Elektronik',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
