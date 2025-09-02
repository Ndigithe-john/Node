const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');

const TourModel = require('./model/tourModel');
const connectDB = require('./config/db.config');

dotenv.config({ path: './config.env' });
connectDB();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

const importData = async () => {
  try {
    await TourModel.deleteMany();

    await TourModel.insertMany(tours);
    console.log('Data Imported Successfully'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await TourModel.deleteMany();
    console.log('Data has been removed'.blue.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
