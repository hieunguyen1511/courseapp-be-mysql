'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      section_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sections',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      is_quizz: {
        type: Sequelize.BOOLEAN,
      },
      video_url: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lessons');
  },
};
