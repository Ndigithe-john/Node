const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const DB_STRING = process.env.DATABASE.replace(
      '<DB_PASSWORD>',
      process.env.DATABASE_PASSWORD,
    );

    const conn = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      `Database connected: ${conn.connection.host}`.brightCyan.underline,
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
