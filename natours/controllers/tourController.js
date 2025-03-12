// const fs = require('fs');

const TourModel = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    console.log(queryObj);
    const excludedField = ['page', 'sort', 'limit', 'fields'];
    excludedField.forEach((el) => delete queryObj[el]);

    console.log(req.query, queryObj);

    const query = TourModel.find(queryObj);
    // const query= TourModel.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await TourModel.findById(req.params.id);
    // const atour = await Tour.findOne({ _id: req.params.id });
    // console.log(atour);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  // Method 1 of creating tours
  // const newTour=new Tour({})
  // newTour.save().then()

  //Method 2 of creating new tours

  try {
    const newTour = await TourModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await TourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// exports.checkId = (req, res, next, val) => {
//   console.log(`The id is ${val}`);
//   const { id } = req.params;
//   if (+id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;

//   const newTour = Object.assign({ id: newId }, req.body);

//   // tours.push(newTour);
//   // tours = [...tours, newTour]; if we use let we can modify tours
//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       console.log(err);
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tours: newTour,
//         },
//       });
//     },
//   );
// };
