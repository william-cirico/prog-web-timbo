'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('usuarios', [{
      nome: "Pedro",
      email: "pedro@email.com",
      senha: "123456",
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
