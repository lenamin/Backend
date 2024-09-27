let arr = [5, 23, '안녕', true, '홍길동', -9]

for (i in arr) {
    if (i > 0 && i < arr.length - 1) {
        console.log(` ${i} is ${arr[i]}`);
    }
}

