const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const DB_STRING = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB_STRING)
  .then(() => console.log('DB Connection established'));
// console.log(app.get('env'));----This one is for express
// console.log(process.env);----This is for node core

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker2',

  price: 800,
});
testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log('Error', err));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.......`.bold.bgYellow);
});
