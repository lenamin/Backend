// 파일 읽고 쓰기 

const fs = require('fs');

/*
fs.readFile('hello.txt', 'utf-8', (err, data) => {
// 첫번째 인자 : 파일 이름 
// 두번째 인자 : 안깨지게 읽기 위한 인코딩 
// 콜백함수 
    if (err) {
        console.log('error', arr);
    } 

    console.log(data);
});


*/

/*
fs.readFile('/etc/hosts', 'utf-8', (err, data) => {
    if (err) {
        console.log('error', arr);
    } 
    
    console.log(data);
});
    
*/

/*
fs.readFile('/etc/passwd', 'utf-8', (err, data) => {
    if (err) {
        console.log('error', arr);
    } 

    console.log(data);
});
    */

// callback 함수 없이 파일읽기
const data = fs.readFileSync('hello.txt', 'utf-8');
console.log(data);

