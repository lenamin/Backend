const express = require('express');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');
// model 받기 
const models = require('./models');
const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use('/posts', postRoute);
app.use('/auth', authRoute);
// 더 많은 기능이 필요하다면 
// app.user("//Users", userRoute); 
// app.use("/Comments", commentRoute); 의 형태로 더 확장할 수 있다 

app.listen(PORT, () => {
  // 물리모델과 개념모델을 싱크한다 
  models.sequelize
    .sync({ force: false })
    .then(() => {
    console.log(`DB 연결 성공`)
  })
    .catch((err) => {
    console.error(`DB 연결 실패 : ${err}`);
    process.exit();
  });
});