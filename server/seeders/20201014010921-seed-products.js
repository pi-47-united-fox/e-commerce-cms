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
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Sepatu',
        image_url: 'https://cdn.elevenia.co.id/g/2/9/3/9/8/5/20293985_B.jpg',
        price: 700000,
        stock: 20,
        CategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tas',
        image_url: 'https://cdn.elevenia.co.id/g/2/9/3/9/8/5/20293985_B.jpg',
        price: 300000,
        stock: 15,
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kaos Polos',
        image_url: 'https://www.konveksipadang.com/wp-content/uploads/2018/08/GROSIR-KAOS-POLOS-DI-PADANG-MURAH-DENGAN-KUALITAS-TERJAMIN-705x705.jpg',
        price: 80000,
        stock: 200,
        CategoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tas Custom Kerajinan Tangan',
        image_url: 'https://sc01.alicdn.com/kf/Hfdc8a48426f84151834eb996d3d99109J.jpg',
        price: 290000,
        stock: 29,
        CategoryId: 1,
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
