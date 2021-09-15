'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students_classes', {
      user_id: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      class_id: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "classes",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students_classes');
  }
};