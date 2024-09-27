// module
const add = (a, b) => a + b // a, b 인자를 받고,  a+b 결과를 반환한다 

function subtract(a, b) {
    return a - b;
}

// module.exports = add; // 내보내기 
// module.exports = subtract;

// 한꺼번에 내보내기 
module.exports.subtract = subtract;
module.exports.add = add;

