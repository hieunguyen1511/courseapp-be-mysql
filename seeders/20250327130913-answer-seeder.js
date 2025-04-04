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
      'Answers',
      [
        {
          id: 1,
          question_id: 1,
          content: "A. React Native là một framework phát triển ứng dụng di động mã nguồn mở được phát triển bởi Facebook.",
          is_correct: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          question_id: 1,
          content: "B. React Native là một framework phát triển ứng dụng web mã nguồn mở được phát triển bởi Google.",
          is_correct: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          question_id: 1,
          content: "C. React Native là một framework phát triển ứng dụng máy tính để bàn mã nguồn mở được phát triển bởi Microsoft.",
          is_correct: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          question_id: 1,
          content: "D. React Native là một framework phát triển ứng dụng di động mã nguồn đóng được phát triển bởi Apple.",
          is_correct: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      {
      question_id: 2,
      content: "A. Để bắt đầu với React Native, bạn cần cài đặt Node.js, npm và Expo CLI.",
      is_correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 2,
      content: "B. Để bắt đầu với React Native, bạn cần cài đặt Python, pip và Expo CLI.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 2,
      content: "C. Để bắt đầu với React Native, bạn cần cài đặt Java, Maven và Expo CLI.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 2,
      content: "D. Để bắt đầu với React Native, bạn cần cài đặt Ruby, Bundler và Expo CLI.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 3,
      content: "A. Một dự án React Native thường có cấu trúc thư mục như sau: /node_modules, /ios, /android, /src, /assets.",
      is_correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 3,
      content: "B. Một dự án React Native thường có cấu trúc thư mục như sau: /node_modules, /ios, /android, /src, /images.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 3,
      content: "C. Một dự án React Native thường có cấu trúc thư mục như sau: /node_modules, /ios, /android, /src, /styles.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 3,
      content: "D. Một dự án React Native thường có cấu trúc thư mục như sau: /node_modules, /ios, /android, /src, /docs.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 4,
      content: "A. Để tạo một ứng dụng React Native đầu tiên, bạn có thể sử dụng lệnh 'npx react-native init MyApp'.",
      is_correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 4,
      content: "B. Để tạo một ứng dụng React Native đầu tiên, bạn có thể sử dụng lệnh 'npx create-react-app MyApp'.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 4,
      content: "C. Để tạo một ứng dụng React Native đầu tiên, bạn có thể sử dụng lệnh 'npx expo init MyApp'.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      question_id: 4,
      content: "D. Để tạo một ứng dụng React Native đầu tiên, bạn có thể sử dụng lệnh 'npx ionic start MyApp'.",
      is_correct: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },],
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
    return queryInterface.bulkDelete('Answers', null, {});
  },
};
