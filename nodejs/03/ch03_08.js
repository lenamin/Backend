const os = require('os');

console.log(`Platform : ${os.platform()}`);
console.log(`Architecture : ${os.arch()}`);
// CPU 코어개수 확인 
console.log(`CPU : ${os.cpus().length}`);
console.log(`Total Memory : ${os.totalmem / 1024 / 1024}`);
console.log(`Free Memory : ${os.freemem / 1024 / 1024} MB`);