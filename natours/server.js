const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const connectDB = require('./config/db.config');

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}...`.bgYellow.bold);
});
