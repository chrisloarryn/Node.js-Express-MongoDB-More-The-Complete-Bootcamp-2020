"use strict";

var express = require('express');

var morgan = require('morgan');

var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var tourRouter = require('./routes/tourRoutes');

var userRouter = require('./routes/userRoutes');

var app = express(); // 1) Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // it's like bodyParser (body-parser)

app.use(express["static"]("".concat(__dirname, "/public")));
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString(); // console.log(req.headers);

  next();
}); // 2) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404));
});
app.use(globalErrorHandler);
module.exports = app;