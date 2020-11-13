'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkInsert('Users', [
      {
        username: 'juan',
        password: 'juan',
        name: 'Juan',
        child_id: 1
      },
      {
        username: 'nicky',
        password: 'nicky',
        name: 'Nicky',
        child_id: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
