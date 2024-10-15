const { Sequelize, Model, DataTypes } = require('sequelize') 

// sequelize 객체 생성 (sqlite 사용) / 어떤 데이터베이스를 쓸 것인지 지정 해줘야 함 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'post.db'
});

// 모델 생성 
const User = sequelize.define("User", {
  user: {
	  type: DataTypes.STRING, 
	  allowNull: false
  },
  
  email: {
	  type: DataTypes.STRING,
	  allowNull: true
  }

});

(async () => {
// 실제 await를 쓰기 위해 빈 async 함수 정의 및 호출
// 실제 모델 생성, 데이터 생성, 데이터 가져옴 
  await sequelize.sync({ force: true }); // 강제로 무조건 만들기, 테이블 컬럼 등의 변경이 생긴 경우 사용할 수 있다. 

})();