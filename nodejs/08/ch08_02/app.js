const express = require('express');
const path = require('path');
const models = require('./models'); 
const multer = require('multer');
// ./modesl/index.js가 자동으로 불려짐 
//-> 해당 index에서 module.exports 에 db를 넣음 
// -> exports 된 걸 models라는 변수로 사용한다. -> 만들어놓은 모든 models에 접근할 수 있다 !! 

const app = express();
const PORT = 3000;
const upload_dir = `public/uploads`

app.use(express.json()); // body를 모두 json으로 읽을 수 있게 

app.use(express.urlencoded({ extens: true }));
app.use("/downloads", express.static(path.join(__dirname, upload_dir))); 
// download 요청을 하면 "public/uploads" 디렉토리를 바라보도록 해준다. 

const storage = multer.diskStorage({
  // 여기에 설정 정보 넣어줄 것 
  destination: `./${upload_dir}`, 
  filename: function(req, file, cb) {
    // 콜백 설정하면서 파일네임 
    // null : error 부분, 필요하면 구현할 수 있음 
    cb(null,
      path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname)// 실제 파일 이름 가져와서 시간스탬프 + extension 붙여주기 
     );
  }
})
const upload = multer({storage: storage});

app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content, author } = req.body;
  let filename = req.file ? req.file.filename : null; 
  // 파일 있으면 multer가 자동으로 파일 저장 / 없으면 null 반환 

  // 클라이언트에 효율적으로 serving 하기 위해 링크 형태로 전달해줄 것. 
  filename = `downloads/${filename}`; // filename은 아까 storage에서 설정해준 이름이 적용되겠지. 

  const post = await models.Post.create({
    title: title,
    content: content,
    author: author,
    filename: filename,
  });
  res.status(201).json(post);
})

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.json({ data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id)

  if (post) {
    res.status(200).json({data: post});
  } else {
    res.status(404).json(`Post is not found`);
  }
})

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body; // 수정할 title, content를 req.body에서 가져와 할당 
  const post = await models.Post.findByPk(id); // 해당되는 포스트 먼저 받아오기 

  if (post) {
    post.title = title;
    post.content = content;

    if (req.file) {
      post.filename = filename;
    }

    await post.save();
    res.status(200).json({ data: post });
  } else {
    res.status(404).json({ result:`Not found post` });
  }
})

app.delete("/posts/:id", async (req, res) => {
  // models.Post.destroyAll()
  // models.Post.truncate();
  const result = await models.Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  console.log(`destroy result: ${result}`);
  if(result) {
    res.status(204).send();
  } else {
    res.status(404).json({ result: "not found psot"});
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  const comment = await models.Comment.create({
    PostId: postId,
    content: content,
  });
  res.status(201).json({ data: comment });
});

app.get("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const comments = await models.Comment.findAll(
    {
      // 외래키 참조 시 자동으로 PostId를 가져온다 
      include: [{ model: models.Post }],
    },
    { 
    where: {
      PostId: postId
    }
  });
  res.status(200).json({ data: comments });
})

app.put("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const comment = await models.Comment.findByPk(id);

  if (comment) {
    comment.content = content;
    await comment.save();
    res.json({data: comment});
  } else {
    res.status(404).json({result: "comment is not found"});
  }
});

app.delete("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Comment.destroy({
    where: { id: id},
  });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ result: "not found comments"});
  }
})

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

