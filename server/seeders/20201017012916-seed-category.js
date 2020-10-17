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
      let data = [
        {
          name: 'Fashion',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Elektronik',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hobby',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Rumah Tangga',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]

      await queryInterface.bulkInsert('Categories', data, {});
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
