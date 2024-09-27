// hello world 10줄을 뿌려보자 

const http = require('http')

http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain");
    const arr = [...Array(10).keys()];
    const arr2 = arr.map(x => {
        return 'Hello World!' + (x + 1) // 요소에 1씩 더한 배열을 arr2 에 생성
    });

    let arr3 = [];
    for(let i = 0; i < 10;i++) {
        arr.push(`Hello World 두번째 ${i+1}`);
    }

    const content = arr2.join('\n');
    const content2 = arr3.join('\n');
    console.log(content);

    // 웹페이지에 뿌려주자 
    res.write(content);
    res.end(); // end를 해주지 않으면 끝이나지않아서 웹브라우저에서 띄울 수가 없음 
}).listen(4500);

