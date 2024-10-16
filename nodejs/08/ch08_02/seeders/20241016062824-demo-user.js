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
        "Users", [
          { 
            name: "lena", 
            email:"sldkfj@gmail.com", 
            createdAt: new Date(), 
            updatedAt: new Date()
          },
          { name: "lena2", 
            email:"sldkfj@gmail.com", 
            createdAt: new Date(), 
            updatedAt: new Date()}
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
