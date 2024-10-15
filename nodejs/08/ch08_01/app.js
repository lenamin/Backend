const { Sequelize, Model, DataTypes } = require('sequelize') 

// sequelize 객체 생성 (sqlite 사용) / 어떤 데이터베이스를 쓸 것인지 지정 해줘야 함 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'post.db'
});

// 모델 생성 
// sequelize.define: 
  /* 함수기반 정의 (좀 더 전통적인 방법) -> 좀 더 작은 프로젝트에서 사용 / 타입스크립트 지원이 잘 안됨 / 간단한 모델 정의할 때 주로 사용됨 */

// Model.init(): 
  /*객체지향 언어처럼 타입스크립트에 대한 통합이 잘 되어 있음 -> EC6 문법 지원 / 복잡하거나 대규모 프로젝트에서 작업*/
  
const User = sequelize.define("User", {
  username: {
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
  await sequelize.sync({ force: false }); 
  
  // user 생성 
  const user1 = await User.create({
    username: "user01",
    email: "user02@smail.com",
  });

  console.log(`user created => ${JSON.stringify(user1)}`);

  // select * from Users;
  const users = await User.findAll();
  console.log(`user=> ${JSON.stringify(users)}`);

  // select * from Users where username = 'user01'
  const user = await User.findOne({
    where: { username: 'user01', },
  })
  console.log(`usero1=> ${JSON.stringify(user)}`);

  // update User set email = 'user01@naver.com' where username = 'user01';
  await User.update({
    // 첫번째 : update 할 대상 
    email: 'user01@naver.com'
  }, {
    where: {
      username: 'user01'
    }
  });

  await User.destroy({
    where: {
      username: 'user01',
    },
  });
})();