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
    await queryInterface.addColumn("Tasks", "cateegoryId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Categories", // 실제 참조할 테이블 명 
        key: "id", 
      },
      onDelete: "SET NULL", // 삭제되면 이 필드에 null을 넣어줘라 
      onUpdate: "CASCADE",
    });
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
