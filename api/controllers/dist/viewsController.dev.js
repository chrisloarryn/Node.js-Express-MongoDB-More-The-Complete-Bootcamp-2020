"use strict";

var Tour = require('./../models/tourModel');

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(function _callee(req, res) {
  var tours;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Tour.find());

        case 2:
          tours = _context.sent;
          // 2)Build template
          // 3) Render that template using data from 1)
          res.status(200).render('overview', {
            title: 'All Tours',
            tours: tours
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getTour = catchAsync(function _callee2(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Tour.findOne({
            slug: req.params.slug
          }).populate({
            path: 'reviews',
            fields: 'review rating user'
          }));

        case 2:
          tour = _context2.sent;
          // console.log(tour);
          // 2)Build template
          // 3) Render that template using data from 1)
          res.status(200).render('tour', {
            title: 'The Forest Hiker Tour',
            tour: tour
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});