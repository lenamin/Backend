const { Sequelize, Model, DataTypes } = require('sequelize') 

// sequelize 객체 생성 (sqlite 사용) / 어떤 데이터베이스를 쓸 것인지 지정 해줘야 함 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'post.db'
});

// 모델 생성 
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