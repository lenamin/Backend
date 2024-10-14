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

app.listen(PORT);