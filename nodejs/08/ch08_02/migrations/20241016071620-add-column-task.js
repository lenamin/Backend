'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // 첫 번째 인자 : 작업할 테이블명 
    // 두 번째 인자 : 추가할 작업명
    // 세 번째 인자 : 속성들 
    // alter table Tasks add column decription varchar(10)
    await queryInterface.addColumn("Tasks", "description", {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
