'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Answers', [
    {
      question_id: 1,
      content: 'Abuja',
      is_correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 1,
      content: 'Lagos',
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 1,
      content: 'Kano',
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 1,
      content: 'Ibadan',
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
