'use strict';

const bcrypt = require("bcryptjs")

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
    let user = 
    [
      {
        email: 'admin@mail.com',
        password : bcrypt.hashSync('1234'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        email: 'cust@mail.com',
        password : bcrypt.hashSync('123456'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
    ]

    await queryInterface.bulkInsert('Users',user, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
