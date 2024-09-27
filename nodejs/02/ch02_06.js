let arr = [1, 2, 3];

const arr2 = arr.map((x)=> {
    return `Hello ${x}`;
});
console.log(arr2);

const arr3 = arr.filter(x => {
    return x % 2 == 1;
});

console.log(arr3)

arr.forEach((v,i) => {
    console.log(`arr5 => ${v} ${i}`)
});

// 연습문제 
