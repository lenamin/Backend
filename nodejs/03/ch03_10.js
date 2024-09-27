//
const fs = require('fs')

const result = fs.readFileSync('test.json', 'utf-8');
// console.log(result);

const data = JSON.parse(result);
// console.log(data);
// 객체의 키, value 등 핸들링 가능 
// 순회 등도 가능함 

// 키에 접근하기 
// console.log(data["result"]);

// forEach 문 돌면서 안에 있는 객체를 콘솔에 출력해보자 

// format string 안먹는다! 
// const arr = data["result"].forEach(x=> console.log(`${x} =====`));
// const arr = data["result"].forEach(x=> console.log(x));

const arr = data["result"]
arr.forEach((x) => {
    console.log(x["title"], x["content"]);
    console.log(x.title, x.content);
    console.log("====");
    console.log(typeof x)
});
