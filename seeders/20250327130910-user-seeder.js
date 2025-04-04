"use strict";

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
    const now = new Date();

    return queryInterface.bulkInsert("Users", [
      {
        username: "hieunguyen1511",
        password:
          "$2b$10$3crqhanUc8KYjaJHmzNAB.O2G7YGw4JWTJYhlt48F3wyJ9qfHmWEK",
        fullname: "Nguyen Trong Hieu",
        birth: "2003-11-15",
        phone: "0969225580",
        email: "hieunguyentronghieu69@gmail.com",
        avatar: null,
        role: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        username: "nrtnhab",
        password:
          "$2a$10$izNqEn2D.b7Sc.xNWHRT6uGlvH/CWsfMFHLtb8SeG7PXJR4fc4FS6",
        fullname: "Nguyen Hoang Anh",
        birth: "2003-08-20",
        phone: "0967657011",
        email: "pkbinhchuannrtnhab@gmail.com",
        avatar: null,
        role: 0,
        createdAt: now,
        updatedAt: now,
      }
    ], {});
  },
  
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
