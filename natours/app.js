const fs = require('fs');

const express = require('express');
const colors = require('colors');

const app = express();

app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server', app: 'natours' });
// });
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint......');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  //   if (+id > tours.length) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Could not find a tour with that id',
  //     });
  //   }
  const tour = tours.find((tour) => tour.id === +id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Could not find a tour with that id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  //   res.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}...`.bgYellow.bold);
});
