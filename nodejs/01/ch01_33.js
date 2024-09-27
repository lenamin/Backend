function fetchData() {
    return new Promise((resolve, reject)=> {
        const success = true;
        if(success) {
            resolve("서버에서 받은 값 넣어줍니다")
        } else {
            reject("데이터 요청 실패");
        }
    });
}

fetchData().then((data) => {  // then 안에서 성공했을 때 처리할 함수를 넣는다 
    console.log(`프로미스로부터 받은 데이터는 ${data}`)
}).catch((error)=> { // 데이터 작업이 실패했을 때 실행할 함수 넣어주기 
    console.log(`에러가 발생했습니다!: ${error}`);
});


