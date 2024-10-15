const express = require('express');
const { graphqlHTTP } = require('express-graphql');// 미들웨어 : res, req 객체를 조작할 수 있다. 
const { buildSchema } = require('graphql'); 

// graphql 스키마 정의 
// Query : 데이터 읽기 위한 스키마 정의 
const schema = buildSchema(`
  type Query {
    hello: String
    welcome(name: String!): String 
  }
`);

// resolver 만들기 
const root = {
  // hello 요청이 들어오면 
  hello: () => {
    return 'Hello GraphQL!';
  },
  // welcome내부 name 인자 받기 
  welcome: ({name}) => {
    return `Welcome ${name}`;
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000);