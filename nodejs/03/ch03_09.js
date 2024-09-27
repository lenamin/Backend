const fs = require('fs');

let result = [];
for (let i = 0; i < 10; i++) {
    result.push(
        // 여기에 자바스크립트 객체를 넣는다. 
        {'title': '나는 제목이야(' + i + ')', 'content':'내용입니다(' + i + ')'}
    );
}

// JSON 파일이 아직 아님 
console.log(result)
console.log(typeof(result))

// JSON 포맷으로 
// console.log(JSON.stringify(result));

// 저장 
const data = {
    'result': result // result라는 키에 배열 내용이 담겨서 나간다. 
}

// 이렇게 하면 에러발생 
//TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Object
// fs.writeFileSync('test.json', data, 'utf-8'); // test.json 파일에 data 객체 저장한다. 


// 문자열로 쏜다. 
const strData = JSON.stringify(data);
fs.writeFileSync('test.json', strData, 'utf-8');

