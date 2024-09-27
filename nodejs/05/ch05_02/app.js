const express = require('express');
const { engine } = require('express-handlebars'); // 구조분해할당 
// express-handlebars 중에서 engine 필요해! 라는 의미 

const app = express();
const PORT = 3000;

// handlebar 관련된 작업 해주기 
 app.engine("handlebars", engine());
 app.set("view engine", "handlebars"); // handlebars를 사용하기 위해 설정하는 부분들 // engine을 설정 
 app.set("views", "./views");

// 라우터 만들기 
app.get("/", (req, res) => {
    const data = {
        title: '첫번째 핸들바',
        message: '수염이 멋집니다',
    };
    res.render('index', data);
});

app.listen(PORT, () => {
    console.log(`${PORT} 서버가 뜨고 있습니다......`);
});