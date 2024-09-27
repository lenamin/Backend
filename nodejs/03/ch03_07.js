const path = require('path');

// 파일 경로 만들기 
const newFilePath = path.join(__dirname, 'folder', 'file.txt');
// 나라마다 directory seperator 가 다르다 
// 이걸 공통으로 경로문자를 만들어주기위해 쓴것! 

// console.log(newFilePath);

// newFilePath에 파일을 생성하고,file.txt에 아무문자열이나 넣어보세요 

const fs = require('fs')

// fs.mkdirSync(newFilePath, {recursive: true});

const content = "아무문자열임"
// fs.writeFileSync('file.txt', content, err=>{});

// 선생님 코드 

// 마지막이 디렉토리일 경우 처리해주기가 어려운 단점이 있음 
// path 모듈이용해서 해당 단점 해결한다 
/*
const makeFile = (fpath, content) => {
    const patharr = fpath.split('/');
    const filename = patharr.pop();
    const dirname = patharr.join('/');
    fs.mkdirSync(dirname, {recursive: true})
    fs.writeFileSync(fpath, content);
}*/

const makeFile2 = (fpath, content) => {
    const filename = path.parse(fpath).base

    if(filename) {
        const dirname = path.parse(fpath).dir // extract dirname from path
        fs.mkdirSync(dirname, {recursive:true})
        fs.writeFileSync(fpath, content);
    }
    
}
makeFile2(newFilePath, "test2")

/*
const patharr = newFilePath.split('/') // / 기준으로 디렉토리 경로와 파일명들이 arr 에 담긴다. 
const filename = patharr.pop(); // 마지막 파일명 pop해서 filename에 할당
console.log(filename, patharr.join('/')) // 남은 디렉토리 합치기
const dirname = patharr.join('/')

fs.mkdirSync(dirname, {recursive: true});
fs.writeFileSync(newFilePath, "test");

*/