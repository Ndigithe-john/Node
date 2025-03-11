const dotenv = require('dotenv');
const fs = require('fs');
const connectDB = require('./config/db.config');
const TourModel = require('./models/tourModel');

dotenv.config();
connectDB();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);
const importData = async () => {
  try {
    await TourModel.deleteMany();
    await TourModel.insertMany(tours);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await TourModel.deleteMany();
    console.log(`Data destroyed`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
