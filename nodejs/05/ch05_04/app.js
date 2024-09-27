const express = require('express');
const fs = require('fs')

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

// 라우터 
app.get("/list", (req, res) => {
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data)
    res.render("list", {posts: result["result"]});
});

app.get("/view", (req, res) => {
    res.render("view");
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.use(express.urlencoded( { extended: true }));
    // form 태그에서 데이터를 날려주면, 
    // 특정한 content 타입으로 날아감 
    // 이를 위해 필요한 작업 
    // form 태그로 전송된 데이터를 받을 수 있음 

let maxId = 0;

const getId = () => {
    const result = fs.readFileSync('test.json', 'utf-8');
    const data = JSON.parse(result)
    const idList = data["result"].map(item => item.id); // id 목록만 담긴다
    const maxId = Math.max(idList);
}; 
getId(); // app.js가 실행되면 기존 파일 중 가장 큰 값을 여기다가 저장한다. 저장할 때 마다 1씩 증가시키면서 사용하면 됨 

// post 요청 처리 
app.post("/create", (req, res) => {
    console.log(`/create post body : ${JSON.stringify(req.body)}`); // [object Object] 로 찍힘 이 내용을 보기 위해 
    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result);

    // 아이디 핸들링
    const lastItem = data['result'].slice(-1); // 맨 마지막 아이템 얻기 
    const lastId = lastItem[0].id + 1; // 맨 마지막 아이템의 아이디 

    const newPost = {
        id: lastId, 
        title: req.body.title, 
        content: req.body.content, 
        writer: req.body.writer, 
        createdAt: '0927'
    }
    // 신규 글 추가 
    data['result'].push(newPost);
    fs.writeFileSync('test.json', JSON.stringify(data), 'utf-8');
    res.redirect("/list") // 글 작성 끝난 후 list 페이지로 돌아가는 것 
});

app.get("/edit", (req, res) => {
    res.render("edit");
});

app.get("/view/:id", (req, res) => {
    const id = req.params.id; // router 뒤에 있는 ID를 id에 담는다. 

    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    let post = {};
    const posts = result["result"];
    posts.forEach(item=> { // posts 를 쭉 돌면서 id가 같은것만 item에 넣어준다. 
        if (item['id'] == id) {
            post = item;
        }
    });
    res.render("view", { post: post });
})

app.listen(PORT, (req, res) => {
    console.log(`게시판 서버를 시작합니다.`);
});