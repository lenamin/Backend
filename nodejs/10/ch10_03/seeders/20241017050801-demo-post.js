'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert("Posts", [
      {
        title: "Test 제목 1 ", 
        content: "나는 내용임1", 
        userId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 2 ", 
        content: "나는 내용임1", 
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title: "Test 제목 3 ", 
        content: "나는 내용임1", 
        userId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 4 ", 
        content: "나는 내용임1", 
        userId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 1 ", 
        content: "나는 내용임1", 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 2 ", 
        content: "나는 내용임1", 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 3 ", 
        content: "나는 내용임1", 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 4 ", 
        content: "나는 내용임1", 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 1 ", 
        content: "나는 내용임1", 
        userId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 2 ", 
        content: "나는 내용임1", 
        userId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 3 ", 
        content: "나는 내용임1", 
        userId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test 제목 4 ", 
        content: "나는 내용임1", 
        userId: 3, 
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
