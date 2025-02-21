const fs = require('fs');

setTimeout(() => console.log('Timer 1 Finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('./test-file.txt', (err, data) => {
  console.log('I/O finished');
  console.log('-----------------------------------');
  setTimeout(() => console.log('Timer 2 Finished'), 0);
  setTimeout(() => console.log('Timer 3 Finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('Process.nextTick'));
});

console.log('Hello from the top level code');

function call() {
  console.log('call function');
}
call();
