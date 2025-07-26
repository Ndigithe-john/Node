const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// Route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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
};
exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const tour = tours.find((tour) => tour.id === +id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: "Couldn't find a tour with that id",
    });
  }

  const updatedTour = { ...tour, name };

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
};
exports.deleteTour = (req, res) => {
  const { id } = req.params;
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
