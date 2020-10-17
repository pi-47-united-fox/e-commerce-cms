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
   const players = 
   [
    {
        "name": "Cristiano Ronaldo",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
        "price": 130000000,
        "stock": 1,
        "category": "Forward",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        "name": "Alison Becker",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4f/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_850_1625.jpg",
        "price": 80000000,
        "stock": 1,
        "category": "Goalkeeper",
        createdAt: new Date(),
        updatedAt: new Date()

    },
    {
        "name": "David De Gea",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/68/David_de_Gea_2017.jpg",
        "price": 50000000,
        "stock": 1,
        "category": "Goalkeeper",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        "name": "Sergio Ramos",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Sergio_Ramos_entrenando_%28cropped%291.jpg",
        "price": 45000000,
        "stock": 1,
        "category": "Defender",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        "name": "Lionel Messi",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg",
        "price": 450000000,
        "stock": 1,
        "category": "Forward",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        "name": "Son Heung-Min",
        "image_url": "https://gmsrp.cachefly.net/images/19/05/01/491a83f0eca32dbb2c017f207dd3b716/690.jpg",
        "price": 100000000,
        "stock": 1,
        "category": "Middfielder",
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ] 
await queryInterface.bulkInsert('Products', players, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
