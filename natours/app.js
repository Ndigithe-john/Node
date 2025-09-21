const colors = require('colors');
const express = require('express');
const morgan = require('morgan');
const qs = require('qs');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(express.urlencoded({ extended: true }));
app.set('query parser', (str) => qs.parse(str));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
