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
      'Lessons',
      [
        {
          id: 1,
          section_id: 1,
          title: 'Giới thiệu về React Native',
          content:
            'React Native là một framework phát triển ứng dụng di động mã nguồn mở được phát triển bởi Facebook. Nó cho phép bạn xây dựng ứng dụng di động cho cả iOS và Android bằng cách sử dụng JavaScript và React.',
          is_quizz: false,
          video_url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw',
          duration: '15:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          section_id: 1,
          title: 'Cài đặt môi trường phát triển',
          content:
            'Để bắt đầu với React Native, bạn cần cài đặt Node.js, npm và Expo CLI. Hãy làm theo hướng dẫn trên trang chủ của React Native để cài đặt.',
          is_quizz: false,
          video_url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw',
          duration: '15:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          section_id: 2,
          title: 'Cấu trúc dự án React Native',
          content:
            'Một dự án React Native thường có cấu trúc thư mục như sau: /node_modules, /ios, /android, /src, /assets. Trong đó, thư mục src chứa mã nguồn chính của ứng dụng.',
          is_quizz: false,
          video_url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw',
          duration: '15:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          section_id: 2,
          title: 'Tạo một ứng dụng React Native đầu tiên',
          content:
            "Để tạo một ứng dụng React Native đầu tiên, bạn có thể sử dụng lệnh 'npx react-native init MyApp'. Sau đó, bạn có thể chạy ứng dụng bằng lệnh 'npx react-native run-android' hoặc 'npx react-native run-ios'.",
          is_quizz: true,
          video_url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw',
          duration: '15:00',
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
    return queryInterface.bulkDelete('Lessons', null, {});
  },
};
