const express = require('express');
const path = require('path');
const models = require('./models'); 
// ./modesl/index.js가 자동으로 불려짐 
//-> 해당 index에서 module.exports 에 db를 넣음 
// -> exports 된 걸 models라는 변수로 사용한다. -> 만들어놓은 모든 models에 접근할 수 있다 !! 

const app = express();
const PORT = 3000;

app.use(express.json()); // body를 모두 json으로 읽을 수 있게 

app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  const post = await models.Post.create({
    title: title,
    content: content,
    author: author,
  });
  res.status(201).json(post);
})

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll(); // select * from posts;
  res.json({ data: posts });
});

// 서버 띄우기 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} 에서`);

  // 데이터베이스를 물리적으로 만드는 작업 해야 함 -> 서버 킬 때 한번만 하면 된다. 
  models.sequelize.sync({force: false}).then(() => {
    console.log(`DB connected`);
  }).catch((err) => {
    console.error(`DB error: ${err}`);
    
  // db 에러나면 프로세스 종료 
    process.exit();
  });
});

