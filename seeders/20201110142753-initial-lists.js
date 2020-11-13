'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('grocerylists', [
      {
        name: "Whole Foods List",
        user_id: 2,
        notes: "Get flowers for Mom"
      },
      {
        name: "Fareway List",
        user_id: 1,
        notes: "If no bread, get waffles."
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('grocerylists', null, {});
  }
};
