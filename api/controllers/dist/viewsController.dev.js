"use strict";

var Tour = require('./../models/tourModel');

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

exports.getOverview = catchAsync(function _callee(req, res, next) {
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
exports.getTour = catchAsync(function _callee2(req, res, next) {
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

          if (tour) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError('There is no tour with that name.', 404)));

        case 5:
          // 2)Build template
          // 3) Render that template using data from 1)
          res.status(200).render('tour', {
            title: "".concat(tour.name, " Tour"),
            tour: tour
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});

exports.getLoginForm = function (req, res) {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = function (req, res) {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(function _callee3(req, res, next) {
  var updatedUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email
          }, {
            "new": true,
            runValidators: true
          }));

        case 2:
          updatedUser = _context3.sent;
          res.status(200).render('account', {
            title: 'Your account',
            user: updatedUser
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});