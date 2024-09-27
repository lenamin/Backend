// express 모듈 import 
const express = require('express');
const app = express(); // express 객체 생성. 이 app을 통해 작업한다 
const port = 3000;

// 첫번째 인자 uri, 두번째 인자 callback method (get 요청만 받겠다)
app.get('/', (req, res) => {
    res.send("Hello World");
}); 

// 서버 띄울 준비 ! 
app.listen(port, () => {
    console.log(`First Express App Listening On Port ${port}`);
});
