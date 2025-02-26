'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Lena1",
        email: "lena1@gmail.com",
        password: "admin1234",
        address: "seoul, korea", 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lena2",
        email: "lena2@gmail.com",
        password: "admin1234",
        address: "seoul, korea", 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lena3",
        email: "lena3@gmail.com",
        password: "admin1234",
        address: "seoul, korea", 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
