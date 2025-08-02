const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD,
);
console.log(DB);
// mongoose
//   .connect(DB, {
//     // useNewURLParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//   })
//   .then((conn) => {
//     console.log(conn.connections);
//   });

mongoose.connect(DB).then(() => {
  console.log('Database connected successfully!'.bgGreen);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}...`.bgYellow.bold);
});
