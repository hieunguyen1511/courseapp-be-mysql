'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Comments', [
      {
        content: 'Bài học này rất hay và bổ ích',
        user_id: 2,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Bài học này mang đến cho tôi nhiều kiến thức bổ ích',
        user_id: 2,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Comments', null, {});
  },
};
