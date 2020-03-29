"use strict";

var express = require('express');

var morgan = require('morgan');

var tourRouter = require('./routes/tourRoutes');

var userRouter = require('./routes/userRoutes');

var app = express(); // 1) Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // it's like bodyParser (body-parser)

app.use(express["static"]("".concat(__dirname, "/public")));
app.use(function (req, res, next) {
  console.log("Hello from middleware \uD83E\uDD19!");
  next();
});
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}); // 2) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
module.exports = app;