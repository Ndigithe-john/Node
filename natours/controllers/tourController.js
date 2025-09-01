const Tour = require('../model/tourModel');

/**
 * @Desc Create a tour
 * @route POST /api/v1/tours
 * @access private
 */
const createTour = async (req, res) => {
  try {
    // const testTour=new Tour({})
    // testTour.save().then()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * @desc Get all tours
 * @route GET /api/v1/tours
 * @access public
 */
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

/**
 * @desc Get a tour
 * @route GET /api/v1/tours/:id
 * @access public
 */
const getTour = async (req, res) => {
  try {
    // const tour = await Tour.findOne({ _id: req.params.id });
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      status: 'fail',
      message: 'Not found',
    });
  }
};

/**
 * @desc Get all tours
 * @route GET /api/v1/tours/:id
 * @access public
 */
const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: 'Error updating document',
    });
  }
};

/**
 * @desc Get all tours
 * @route GET /api/v1/tours/:id
 * @access public
 */
const deleteTour = async (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = { createTour, getAllTours, getTour, updateTour, deleteTour };

/**
 * Desk Check for id validity
 */

// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };
