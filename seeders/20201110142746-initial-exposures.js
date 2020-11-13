'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Exposures', [
      {
        user_id: 1,
        food_id: 1,
        child_id: 1,
        date: '2020-11-09 15:45:28.743-06',
        reaction: "Ate one-fourth avocado and loved it!"
      },
      {
        user_id: 1,
        food_id: 1,
        child_id: 1,
        date: '2020-12-09 15:45:28.743-06',
        reaction: "Mashed with pasta. Really enjoyed."
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Exposures', null, {});
  }
};
