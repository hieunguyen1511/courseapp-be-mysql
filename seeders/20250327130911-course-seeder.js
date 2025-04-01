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
        name: 'React Native Cơ Bản',
        description: 'Khóa học React Native cơ bản', 
        status: 1,
        price: 200000,
        discount: 0, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 2,
        name: 'Express.js',
        description: 'Học Express.js từ cơ bản đến nâng cao',
        status: 1,
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
        category_id: 1,
        name: 'React.js Cơ Bản',
        description: 'Khóa học React.js cơ bản',
        status: 1,
        price: 0,
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
