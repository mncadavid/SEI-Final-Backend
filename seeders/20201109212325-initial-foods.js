'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('food', [
      {
        name: 'Avocado',
        category: 'Fruit'
      },
      {
        name: "Apple",
        category: "Fruit"
      },
      {
        name: "Asparagus",
        category: "Vegetable"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('food', null, {});
  }
};
