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
      'Sections',
      [
        {
          //id: 1,
          course_id: 1,
          name: 'Chương 1: Giới thiệu về React Native',
          description:
            'Giới thiệu về React Native và cách cài đặt môi trường phát triển',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //id: 2,
          course_id: 1,
          name: 'Chương 2: Cài đặt môi trường phát triển',
          description:
            'Hướng dẫn cài đặt môi trường phát triển cho React Native',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //id: 3,
          course_id: 1,
          name: 'Chương 3: Các thành phần cơ bản',
          description: 'Giới thiệu về các thành phần cơ bản trong React Native',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //id: 4,
          course_id: 1,
          name: 'Chương 4: Tạo ứng dụng đầu tiên',
          description: 'Hướng dẫn tạo ứng dụng đầu tiên với React Native',
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
    return queryInterface.bulkDelete('Sections', null, {});
  },
};
