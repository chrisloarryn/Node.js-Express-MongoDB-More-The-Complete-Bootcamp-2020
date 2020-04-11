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
          // 3) Render that template using data
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

exports.getTour = function (req, res) {
  res.status(200).render('overview', {
    title: 'The Forest Hiker Tour'
  });
};