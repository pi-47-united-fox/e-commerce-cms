'use strict';

const bcrypt = require('bcryptjs')

const data = require('../admin.json')
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

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
   let salt = bcryptjs.genSaltSync(10)
   await queryInterface.bulkInsert('Users', [{
       email: 'admin@mail.com',
       password: bcryptjs.hashSync('1234', salt),
       role: 'admin',
       createdAt : new Date(),
       updatedAt : new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', [{
      email: 'admin@mail.com',
      password: bcryptjs.hashSync('1234')
    }], {});
  }
};
