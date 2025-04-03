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
          id: 1,
          name: "Frontend",
          description: "Frontend Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Backend",
          description: "Backend Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Mobile",
          description: "Mobile Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "DevOps",
          description: "DevOps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
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
