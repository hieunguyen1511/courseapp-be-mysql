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
    return queryInterface.bulkInsert(
      'Enrollments',
      [
        {
          //id: 1,
          user_id: 1,
          course_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //id: 2,
          user_id: 1,
          course_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //id: 3,
          user_id: 1,
          course_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Enrollments', null, {});
  },
};
