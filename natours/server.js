const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const connectDB = require('./config/db.config');

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.......`.bold.bgYellow);
});
