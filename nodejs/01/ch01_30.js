try {
    const err = new Error('This is Error');
    err.name = 'My first error'
    err.message = 'My first error message'
    throw err;
} catch(e) {
    console.log(`얘외처리 예외이름: ${e.name}, 예외 메세지 : ${e.message}`)
}
