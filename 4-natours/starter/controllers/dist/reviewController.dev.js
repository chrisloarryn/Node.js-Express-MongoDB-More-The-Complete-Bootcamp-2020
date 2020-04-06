"use strict";

var Review = require('./../models/reviewModel');

var catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(function _callee(req, res, next) {
  var reviews;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Review.find());

        case 2:
          reviews = _context.sent;
          res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: {
              reviews: reviews
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createReview = catchAsync(function _callee2(req, res, next) {
  var newReview;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Allow nested routes
          if (!req.body.tour) req.body.tour = req.params.tourId;
          if (!req.body.user) req.body.user = req.user.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Review.create(req.body));

        case 4:
          newReview = _context2.sent;
          res.status(201).json({
            status: 'success',
            data: {
              review: newReview
            }
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});