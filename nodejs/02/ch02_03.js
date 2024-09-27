
const http = require('http') // require: 외부 모듈 불러서 담는다 

// createServer 이후에 요청객체, 응답객체 가져온다 
http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write("Hello World!");
    res.end();
}).listen(4500); 

// 웹서버는 듣고있어야 한다. (4500은 port 번호)