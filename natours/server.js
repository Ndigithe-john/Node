const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Changing the world', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoing');
});
const port = 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}.......`);
});
