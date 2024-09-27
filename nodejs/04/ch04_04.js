const http = require('http');
const url = require('url');
const fs = require('fs');

// list 함수 
const list = (req, res) => {
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    console.log(result);
    const resStr = JSON.stringify(result);
    res.end(resStr);
}

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json");

    if (path == "/list") {
        list(req, res);
    } else {
        res.end("");
    }
}).listen(4500);


