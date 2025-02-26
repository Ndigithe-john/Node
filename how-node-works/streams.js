const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //  solution 1
  //   fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Solution 2: Use streams
  //   const readable = fs.createReadStream('./test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });
  // Solution 3 Using pipe
  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res);
  //    readableSource.pipe(wrirableDestination)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to port 8000......');
});
