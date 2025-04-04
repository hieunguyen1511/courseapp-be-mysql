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
    return queryInterface.bulkInsert('Courses', [
      {
        category_id: 1,
        name: 'Node.js',
        description: 'Learn Node.js from scratch',
        status: 1,
        total_rating: 0,
        price: 200000,
        discount: 0, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 1,
        name: 'Express.js',
        description: 'Learn Express.js from scratch',
        status: 1,
        total_rating: 5,
        price: 200000,
        discount: 0, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 1,
        name: 'Sequelize',
        description: 'Learn Sequelize from scratch',
        status: 1,
        total_rating: 3,
        price: 200000,
        discount: 0, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
        category_id: 3,
        name: 'HTML',
        description: 'Learn HTML from scratch',
        status: 1,
        total_rating: 0,
        price: 200000,
        discount: 0, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
