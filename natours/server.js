const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

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

  const tour = tours.find((el) => el.id === +id);
  // if (+id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
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
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour)
  // tours = [...tours, newTour]; if we use let we can modify tours
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  // const tour = tours.find((el) => el.id === +id);
  // if (!tour) {
  if (+id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here........>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;

  if (+id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// app.post('/api/v1/tours', (req, res) => {
//   // console.log(req);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       console.error(err);
//       res.status(201).json({
//         status: 'success',
//         data: { tour: newTour },
//       });
//     }
//   );
// });

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Changing the world', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoing');
// });
const port = 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}.......`);
});
