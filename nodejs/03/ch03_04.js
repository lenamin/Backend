const fs = require('fs');

// 파일에 쓸 내용 적기 
const content = "안녕하세요 홍길동입니다. \n반갑습니다.이길동입니다";

// fs.writeFile('out.text', content, err=>{});
fs.writeFileSync('out.sync.text', content);

