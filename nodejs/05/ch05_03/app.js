const express = require('express')
const fs = require('fs');
const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); // express view engine을 ejs로 사용하겠다. (템플릿 엔진 ejs로)
app.set("views", "./views"); // 템플릿 디렉토리 설정

app.get('/', (req, res) => {
    const data = {
        title: "EJS 예제",
        message: "안녕! EJS는 처음이지?!",
    };
    res.render('index', data);
});

app.get("/for", (req, res) => {
    res.render("for");
})

app.get("/if", (req, res) => {
    res.render("if");
})

app.get("/test", (req, res) => {
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    res.render('test', { posts: result["result"] }); // test라는 ejs 파일에서 posts 변수로 접근할 수 있다 
})

app.listen(PORT, () => {
    console.log(`${PORT}로 웹서버가 실행 중...`)
})