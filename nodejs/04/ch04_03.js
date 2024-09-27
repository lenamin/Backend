const http = require('http')
const url = require('url')
const fs = require('fs')

// test.json 내용 읽어서 브라우저에 뿌려주기 

http.createServer((req, res)=> {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json"); // json 포맷으로 응답을 해줘라 ~ 

    if (path == '/json') {
        // 파일에서 데이터 읽기 
        const data = fs.readFileSync('test.json', 'utf-8');
        const result = JSON.parse(data);
        res.end(JSON.stringify(result));
    } else {
        res.end("")
    }
}).listen(4500)