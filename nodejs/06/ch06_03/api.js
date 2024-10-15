const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

// graphql 관련 모듈 임포트 
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql'); // 스키마 받기 위해 

// database 설정 
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);
const app = express();
const PORT = 3000;

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
db.exec(create_sql);

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String
    content: String
    author: String
    createdAt: String 
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post 
  }
`);

// resolver 
const root = {
  // 모든 게시글 가져오기 
  getPosts: () => {
    const stmt = db.prepare(`select * from posts`);
    return stmt.all() // select list 할 때 all 함수 사용 
  },

  // 특정 아이디에 해당하는 포스트 하나 가져오기 
  getPost: ({id}) => {
    const stmt = db.prepare(`select * from posts where id = ?`);
    return stmt.get(id);
  },
};

app.use(
  "/graphql", 
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT);