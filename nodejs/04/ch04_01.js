// 웹서버 만들기 
// 페이지 두 개 나오게 만든다! 
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
     // req: 서버 만든 다음 콜백 함수에 넣어주는 기본 인자. request 객체 
     // res: response 객체 
    
    //  console.log(req.url); // /hello, /world
    
    /*
    if (req.url == '/hello') {
        // hello 일 때의 처리 
        res.end("<h1>Hello</h1>");
     } else if (req.url == '/world') {
        // 클라이언트에 어떤 응답을 주기 위해서
        res.end("<h1>World</h1>");
     } else if (req.url == "/") {
        // 기본 url 처리 로직 
        res.end("first page");
     }
        */
     const path = url.parse(req.url, true).pathname
     console.log(path, req.url)
 
    if (path == '/hello') {
        // hello 일 때의 처리 
        res.end("<h1>Hello</h1>");
    } else if (path == '/world') {
        // 클라이언트에 어떤 응답을 주기 위해서
        res.end("<h1>World</h1>");
    } else if (path == "/") {
        // 기본 url 처리 로직 
        res.end("first page");
    }



}).listen(4500);