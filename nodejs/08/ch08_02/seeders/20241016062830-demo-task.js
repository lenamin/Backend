'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      // 첫 번째 인자: 테이블 이름 
      // 두 번째 인자: Users 테이블안에 넣을 데이터들 
        "Tasks", [
          { title: "Task 1 for lena", 
            userId: 1, 
            createdAt: new Date(), 
            updatedAt: new Date(),
          },
          { 
            title: "Task 2 for lena", 
            userId: 2, 
            createdAt: new Date(), 
            updatedAt: new Date(),
          }
        ]
    );
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
