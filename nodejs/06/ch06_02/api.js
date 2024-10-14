const express = require('express');
const moment = require('moment');
const sqlite3 = require('sqlite3');
const path = require('path');

// database 세팅, // db 생성 
const db_name = path.join(__dirname, "post.db");
const db = new sqlite3.Database(db_name);

// express 앱 만들기, PORT 생성 
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
// 테이블 생성 
db.serialize(() => {
  db.run(create_sql);
})

/* 라우터들  */
// 1. GET /posts 게시글 목록 
app.get("/posts", (req, res) => {
  // http://localhost:300/posts?page=2 이렇게 받으면 page에는 2가 담기겠지 
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit; // page 별로 데이터 볼 때 몇 번째 row 부터 시작하는지 -> page가 2면 offset은 5 

  let sql = `
    select id, title, author, createdAt, count from posts
    order by createdAt DESC limit ? offset ? 
  `

  db.all(sql, [limit, offset], (err, rows) => {
    // 데이터 처리할 콜백함수

    if(err) {
      console.error(err.message);
      res.status(500).send(err.message);
    } else {
      // 전체 게시글 숫자 가져오는 쿼리 
      let cnt_sql = `select count(1) as count from posts`;
      db.get(cnt_sql, (err1, row) => {
        if(err1) {
          console.error(err1.message);
          res.status(500).send(err1.message);
        } else {
          // cnt_sql에서 alias를 줘야 count 값 가져올 수 있음 
          // 전체 게시글 수 
          const total = row.count;
          const totalPages = Math.ceil(total / limit);
          res.json({ items: rows, currentPage: page, totalPages: totalPages });
        }
      });
    }
  });
});

// 2. GET /posts/1 상ㅔ 게시글 가져오기  
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  // 쿼리문 작성 
  let sql = `select id, title, content, author, createdAt, count from posts where id = ?`;

  // 조회수 증가시키는 쿼리 
  let count_sql = `update posts set count = count + 1 where id = ?`;

  db.run(count_sql, [id], (err) => {
    if(err) {
      res.status(500).send(err.mesage);
    }
    db.get(sql, [id], (err1, row) => {
      // 게시글 하나만 받는다 
      if (err1) {
        res.status(500).send(err1.message);
      } 
      res.json({item: row});
      })
    });
});

// 3. POST /posts 게시글 쓰기 
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
    insert into posts(title, content, author) values(?, ?, ?)
    `;
    db.run(sql, [title, content, author], (err) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        console.log(`row id: ${this.lastID}`);
        // 마지막에 생성된 아이디를 가져와서 찍어볼 수 있다 
        res.json({ result: "success", id: this.lastID });
      }
    });
});

// 4. PUT /posts/1 게시글 수정 
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;

  let sql = `update posts set title = ?, content = ? where id = ?`;
  db.run(sql, [title, content, id], (err) => {
    if(err) {
      res.status(500).send(err.message);
    }

    res.json({result: "success"}); // result를 success로 res에 준ㅏ 
  })

});

// 5. DELETE /posts/1 게시글 삭제 
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from posts where id = ?`;

  db.run(sql, [id], (err) => {
    if(err) {
      res.status(500).sned(err.message);
    }
    res.json({result:"success!"});
  });
});


app.listen(PORT, () => {
  console.log(`server list listening on port ${PORT}`)
});