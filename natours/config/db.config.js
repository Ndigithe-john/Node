const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const DB_STRING = process.env.DB_CONNECTION_STRING.replace(
      '<PASSWORD>',
      process.env.DB_PASSWORD,
    );
    console.log(DB_STRING);
    const conn = await mongoose.connect(DB_STRING);
    console.log(
      `MongoDB connection successful on ${process.env.NODE_ENV} environment`
        .bgGreen,
    );
  } catch (error) {
    console.log(`connection error ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// ${conn.connection.host}`
