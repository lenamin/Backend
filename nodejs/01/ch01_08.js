const test = "변경불가";
console.log(`test: ${test}`);

// test = "변경해줘"
// console.log(`test: ${test}`);

// 
let date = new Date();

if (date.getHours() < 12) {
    console.log(`오전입니다 : ${date.getHours()}`);
} else if (date.getHours() >= 12) {
    console.log(`오후입니다 : ${date.getHours()}`);
}

let hours = date.getHours();

if (hours < 11) {
    console.log(`아침먹을 시간입니다.`);
} else {
    if (hours < 15) {
        console.log(`점심먹을 시간입니다.`);
    } else {
        console.log(`저녁 먹을 시간입니다.`);
    }
}


