const EventEmitter = require('events');

const myEmmiter = new EventEmitter();

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
myEmmiter.emit('newSale');
myEmmiter.emit('newSale');
