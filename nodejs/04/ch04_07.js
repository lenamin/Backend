const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get("/list", (req, res) => {
    list(req, res);
});

app.get("/view/:id", (req, res) => {
    // 게시글 정보 읽어서 받는 
    
    const id = req.params.id; // id로 접근하기 위한 
    const data = fs.readFileSync('test.json', 'utf-8')
    const result = JSON.parse(data); // Javascript 객체로 문자 변환 
    const posts = result['result'];

    let post = {};
    // 05 이전 파일에서 filter를 통해 했던 작업들 
    posts.forEach((item) => {
        if (item.id == id) {
            post = item;
        }
    });
    res.json(post);
});

// list 함수 
const list = (req, res) => {
    // 데이터를 파일에서 읽어서 클라이언트로 쏴준다 
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    res.json(result)
}

// callback: app이 실행되었을 때의 콜백함수 
app.listen(port, () => {
    console.log(`listening onport ${port}`);
});



