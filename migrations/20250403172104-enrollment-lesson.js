'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('EnrollmentLessons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      enrollment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Enrollments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      lesson_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lessons',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
