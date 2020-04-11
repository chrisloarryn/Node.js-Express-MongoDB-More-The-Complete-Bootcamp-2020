"use strict";

var path = require('path');

var express = require('express');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var tourRouter = require('./routes/tourRoutes');

var userRouter = require('./routes/userRoutes');

var reviewRouter = require('./routes/reviewRoutes');

var viewRouter = require('./routes/viewRoutes');

var app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // 1) GLOBAL MIDDLEWARE
// Serving static files

app.use(express["static"](path.join(__dirname, 'public'))); // Set security HTTP headers

app.use(helmet()); // Development

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // Limit requests from same API


var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  // 1 hour to milliseconds
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); // Body parser, reading data from body into req.body

app.use(express.json({
  limit: '10kb'
})); // Data sanitization against NoSQL query injection
// // { "email": { "$gt": ""}, "password": "pass1234" }

app.use(mongoSanitize()); // Data sanitization against XXS (cross site scripting attacks)

app.use(xss()); // Prevent parameter pollution

app.use(hpp({
  whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty', 'price']
})); // Test middleware

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString(); // console.log(req.headers);

  next();
}); // 2) ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404));
});
app.use(globalErrorHandler);
module.exports = app;