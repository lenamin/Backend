let personInfo = {
    'name' : '홍길동',
    'age' : 25,
    'address' : '서울시 금천구 독산동',
    'hobby' : ['등산', '독서', '코딩'],
    addAge: function() {
        this.age = this.age + 1;
    },
    changeAddress: function(newAddress) {
        this.address = newAddress
    },
    getAddress: function() {
        return this.address
    },
    getAge: function() {
        return this.age
    }
}


console.log(`before age: ${personInfo.age}`);
personInfo.addAge();
console.log(`after age: ${personInfo.age}`);

console.log(`before address: ${personInfo.address}`);
personInfo.changeAddress("서울시 양천구 목동");
console.log(`get address: ${personInfo.getAddress()}`);

console.log(`get age: ${personInfo.getAge()}`);