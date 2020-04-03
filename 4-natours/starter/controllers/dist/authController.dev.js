"use strict";

var User = require('../models/userModel');

var catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(function _callee(req, res, next) {
  var newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create(req.body));

        case 2:
          newUser = _context.sent;
          res.status(201).json({
            status: 'success',
            data: {
              user: newUser
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});