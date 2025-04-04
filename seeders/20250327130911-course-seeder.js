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
      'Courses',
      [
        {
          id: 1,
          category_id: 1,
          name: 'React Native Cơ Bản',
          description: 'Khóa học React Native cơ bản',
          status: 1,
          total_rating: 0,
          price: 200000,
          discount: 0,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          category_id: 2,
          name: 'Express.js',
          description: 'Học Express.js từ cơ bản đến nâng cao',
          status: 1,
          total_rating: 5,
          price: 200000,
          discount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_id: 2,
          name: 'Sequelize',
          description: 'Học Sequelize từ cơ bản đến nâng cao',
          status: 1,
          price: 0,
          discount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          category_id: 1,
          name: 'React.js Cơ Bản',
          description: 'Khóa học React.js cơ bản',
          status: 1,
          total_rating: 3,
          price: 200000,
          discount: 0,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          category_id: 2,
          name: 'React.js',
          description: 'Learn React.js from scratch',
          status: 1,
          total_rating: 2,
          price: 200000,
          discount: 0,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          category_id: 2,
          name: 'Redux',
          description: 'Learn Redux from scratch',
          status: 1,
          total_rating: 5,
          price: 200000,
          discount: 0,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          category_id: 2,
          name: 'React Native',
          description: 'Learn React Native from scratch',
          status: 1,
          total_rating: 1,
          price: 200000,
          discount: 0,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          category_id: 3,
          name: 'HTML',
          description: 'Learn HTML from scratch',
          status: 1,
          price: 200000,
          discount: 0,
          total_rating: 4.8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          category_id: 3,
          name: 'CSS',
          description: 'Learn CSS from scratch',
          status: 1,
          total_rating: 4,
          price: 200000,
          discount: 0,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          category_id: 3,
          name: 'JavaScript',
          description: 'Learn JavaScript from scratch',
          status: 1,
          total_rating: 5,
          price: 200000,
          discount: 0,

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
    return queryInterface.bulkDelete('Courses', null, {});
  },
};
