const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmmiter = new Sales();

myEmmiter.on('newSale', () => {
  console.log('New sale recorded');
});

myEmmiter.on('newSale', () => {
  console.log('Item bought is book');
});

myEmmiter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});
myEmmiter.emit('newSale', 9);

///////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('2 Request Received');
  console.log(req.url);
  res.end('Request Received');
});

server.on('request', (req, res) => {
  console.log('Another Request 😂');
});

server.on('close', () => {
  console.log('Server Close');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests');
});
