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
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Frontend",
          description: "Frontend Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Backend",
          description: "Backend Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobile",
          description: "Mobile Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DevOps",
          description: "DevOps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "UI/UX",
          description: "UI/UX",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
