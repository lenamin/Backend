const express = require('express');
const moment = require('moment');
const path = require('path');
const Database = require('better-sqlite3');

// database Setting 
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express 앱 만들기, PORT 버ㄴ호 할당 
const app = express();
const PORT = 3000;

app.use(express.json()); // 요청 본문에서 JSON 사용할거임 

const create_sql = `
  create table if not exists posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(100),
    createdAt datetime default current_timestamp,
    count integer default 0  
  );

  create table if not exists comments (
    id integer primary key autoincrement,
    content text not null,
    postId integer,
    foreign key(postId) references posts(id)
  );
`
db.exec(create_sql); // create_sql 쿼리를 실행할 수 있다 

app.get("/posts", (req, res) => {
  // http://localhost:300/posts?page=2 이렇게 받으면 page에는 2가 담기겠지 
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit; // page 별로 데이터 볼 때 몇 번째 row 부터 시작하는지 -> page가 2면 offset은 5 

  let sql = `
    select id, title, author, createdAt, count from posts
    order by createdAt DESC limit ? offset ? 
  `
  
  const stmt = db.prepare(sql) // stmt 에 쿼리문을 날릴 준비작업

  const rows = stmt.all(limit, offset);
  // rows에 실행결과 넣는다 

  res.json({ items: rows }); // rows를 json 형태로 출력한다. 

});

// 2. GET /posts/1 상ㅔ 게시글 가져오기  
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  // 쿼리문 작성 
  let sql = `select id, title, content, author, createdAt, count from posts where id = ?`;

  // 조회수 증가시키는 쿼리 
  let count_sql = `update posts set count = count + 1 where id = ?`;

  db.prepare(count_sql).run(id);
  // 메서드 체이닝 
  // const stmt = db.prepare(count_sql)
  // stmt.run(id);

  const post = db.prepare(sql).get(id)
  res.status(200).json({ item: post});
});

// 3. POST /posts 게시글 쓰기 
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
    insert into posts(title, content, author) values(?, ?, ?)
    `;
  
  const stmt = db.prepare(sql);
  const result = stmt.run(title, content, author);
  
  console.log(`${JSON.stringify(result)}`);
  res.status(201).json({id: result.lastInsertRowid, title: title, content: content}) // 상태코드 201로 json 포맷으로 내려준다 

});

// 4. PUT /posts/1 게시글 수정 
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;

  let sql = `update posts set title = ?, content = ? where id = ?`;

  // 에러처리 
  try {
    const result = db.prepare(sql).run(title, content, id);
  
    console.log(`result => ${JSON.stringify(result)}`);

    if (result.changes) {
      res.status(200).json({ result: "success"});
    } else {
      res.status(404).json({ error: "post is not found" });
    }
  } catch (e) {
    res.status(500).json({error: e });
  }
});

// 5. DELETE /posts/1 게시글 삭제 
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from posts where id = ?`;

  try {
    const result = db.prepare(sql).run(id)
    if (result.changes) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'post not found' });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

/* 댓글 기능 */
// 1. 특정 포스트에 댓글 추가 
app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body; // req.body.content를 content에 할당한다. 
  const postId = req.params.id;

  const stmt = db.prepare(`insert into comments(postId, content) values(?, ?)`);
  const result = stmt.run(postId, content);

  res.status(201).json({ id: result.lastInsertRowid, postId: postId, content: content });
  // 신규 생성된 댓글의 아이디와 내용, 게시글 아이디를 클라이언트에 반환해줌 
});

// 2. 특정 포스트 댓글 가져오기 
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = db.prepare(`select * from comments where postId = ?`).all(postId) // postId가 ?안으로 들어가면서 comments 변수에 담기겠지 

  res.json( { comments: comments });
});

app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comments = db.prepare(`select * from comments where postId = ?`).all(id) // postId가 ?안으로 들어가면서 comments 변수에 담기겠지 

  res.json( { comments: comments });
});

// 3. 댓글 삭제 
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from comments where id = ?`;

  const result = db.prepare(sql).run(id);

  if (result.changes) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'comment not found' });
  }
})

// 4. 댓글 수정 
app.put("/comments/:id", (req, res) => { // 댓글 아이디
  const id = req.params.id;
  const { content } = req.body;

  let sql = `update comments set content = ? where id = ?`;

  try {
    const result = db.prepare(sql).run(content, id);
    console.log(`result => ${JSON.stringify(result)}`);

    if (result.changes) {
      res.status(200).json({ result: "success" });
    } else {
      res.status(404).json({ error: "comment not found" });
    }

  } catch (e) {
    res.status(500).json( {error: e});
  }

})


app.listen(PORT);