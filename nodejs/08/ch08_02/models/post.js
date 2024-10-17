// module을 내보내기 할 함수 
module.exports = (sequelize, DataTypes) => {
  // create table Post()
  const Post = sequelize.define('Post', {
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.STRING,
    author: DataTypes.STRING(50),
    filename: DataTypes.STRING,
    }, {
      tableName: "Board" // 테이블 이름 지정도 가능 
  });

  Post.associate = function (models)  {
    Post.hasMany(models.Comment);
  };
   return Post // Post 객체 반환 
};