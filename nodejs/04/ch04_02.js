const url = require('url');
const http = require('http');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname // 파라미터가 들어와도 URL 정보만 들어올 수 있게 한다. 
    // path에는 URL 정보만 들어있다 

    // 자바스크립트 객체 생성 
    const post = {title : "this is the title", content : "This is a content"};
    res.setHeader("Content-Type", "application/json");

    if (path == "/json") {
        const postStr = JSON.stringify(post);
        console.log(postStr); 
        res.end(postStr);
    } else {
        res.end("<h1>help</h1>")
    }
}).listen(4500);