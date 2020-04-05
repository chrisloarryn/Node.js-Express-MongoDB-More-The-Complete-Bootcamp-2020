"use strict";

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var filterObj = function filterObj(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          // SEND RESPONSE
          res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
              users: users
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateMe = catchAsync(function _callee2(req, res, next) {
  var filteredBody, updatedUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.body.password || req.body.passwordConfirm)) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return", next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400)));

        case 2:
          // 2) Filtered out unwanted field names that are not allowed to be updated
          filteredBody = filterObj(req.body, 'name', 'email'); // 3) Update user document

          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedUser = _context2.sent;
          res.status(200).json({
            status: 'success',
            user: updatedUser
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.deleteMe = catchAsync(function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});

exports.getUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: 'This route is not yet defined! 😏'
  });
};

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: 'This route is not yet defined! 😏'
  });
};

exports.updateUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: 'This route is not yet defined! 😏'
  });
};

exports.deleteUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: 'This route is not yet defined! 😏'
  });
};