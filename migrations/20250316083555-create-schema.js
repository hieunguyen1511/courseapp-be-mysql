'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema('courseapp_development');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropSchema('courseapp_development');
  },
};
