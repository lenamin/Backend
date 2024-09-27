const express = require('express');
const app = express()
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views'); // 템플릿 파일들이 모여져있다 (html과 데이터를 섞기 위해 만들어놓은 특정 규약이 있는 파일) )

// 라우터 만들기
app.get("/", (req, res) => {
    const data = {
        title: '제목이 들어갑니다',
        message: '안녕하세요, PUG!',
    }
    res.render('index', data)
    // 템플릿 엔진에 데이터 입혀주는 역할을 한다. 
    // index 파일 안에 title이라는 변수가 선언되어 있으면, 그 변수에 "제목이 들어갑니다"를 대체해준다. 
});

app.listen(PORT, () => {
    console.log(`${PORT}로 웹서버 실행중...`)
});

