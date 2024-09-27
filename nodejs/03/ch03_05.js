const fs = require('fs');

const dirName = 'naver/daum/google'
fs.mkdirSync(dirName, {recursive: true});


//fs.writeFileSync 를 이용해 naver/daum/google/out.txt 를 만들어보세요 
const content = "안녕하세요 홍길동입니다. \n반갑습니다.이길동입니다";
fs.writeFileSync('./naver/daum/google/lala/out2.txt', content);


