const dotenv = require('dotenv');
const fs = require('fs');
const connectDB = require('./config/db.config');
const TourModel = require('./models/tourModel');
const UserModel = require('./models/userModels');

dotenv.config();
connectDB();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf-8'),
);

//  Import Data into Database
const importData = async () => {
  try {
    await TourModel.deleteMany();
    await UserModel.deleteMany();

    await TourModel.insertMany(tours);
    // await UserModel.insertMany(users);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Delete all data from my db
const destroyData = async () => {
  try {
    await TourModel.deleteMany();
    await UserModel.deleteMany();
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
