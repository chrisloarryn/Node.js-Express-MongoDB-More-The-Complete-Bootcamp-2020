"use strict";

var Review = require('./../models/reviewModel');

var catchAsync = require('./../utils/catchAsync');

var factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(function _callee(req, res, next) {
  var filter, reviews;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filter = {};
          if (req.params.tourId) filter = {
            tour: req.params.tourId
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(Review.find(filter));

        case 4:
          reviews = _context.sent;
          res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: {
              reviews: reviews
            }
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});

exports.setTourUserIds = function (req, res, next) {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);