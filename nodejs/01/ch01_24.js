setTimeout(function() {
    console.log(`1초 뒤에 호출`);
}, 1000);

setTimeout(function() {
    console.log(`2초 뒤에 호출`);
}, 2000);

setInterval(function() {
    console.log(`1초 마다 실행`);
}, 1000);