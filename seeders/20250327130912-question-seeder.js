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
   return queryInterface.bulkInsert('Questions', [
    {
      id: 1,
      lesson_id: 4,
      content: "React Native là gì?",
      note: "React Native là một framework phát triển ứng dụng di động mã nguồn mở được phát triển bởi Facebook. Nó cho phép bạn xây dựng ứng dụng di động cho cả iOS và Android bằng cách sử dụng JavaScript và React.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
    id: 2,
      lesson_id: 4,
      content: "Cách cài đặt môi trường phát triển React Native?",
      note: "Để bắt đầu với React Native, bạn cần cài đặt Node.js, npm và Expo CLI. Hãy làm theo hướng dẫn trên trang chủ của React Native để cài đặt.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        id: 3,
      lesson_id: 4,
      content: "Cấu trúc dự án React Native?",
      note: "Một dự án React Native thường có cấu trúc thư mục như sau: /node_modules, /ios, /android, /src, /assets. Trong đó, thư mục src chứa mã nguồn chính của ứng dụng.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        id: 4,
      lesson_id: 4,
      content: "Cách tạo một ứng dụng React Native đầu tiên?",
      note: "Để tạo một ứng dụng React Native đầu tiên, bạn có thể sử dụng lệnh 'npx react-native init MyApp'. Sau đó, bạn có thể chạy ứng dụng bằng lệnh 'npx react-native run-android' hoặc 'npx react-native run-ios'.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Questions', null, {});
  },
};
