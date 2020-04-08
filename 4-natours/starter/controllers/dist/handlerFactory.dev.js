"use strict";

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

exports.deleteOne = function (Model) {
  return catchAsync(function _callee(req, res, next) {
    var doc;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Model.findByIdAndDelete(req.params.id));

          case 2:
            doc = _context.sent;

            if (doc) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", next(new AppError("No document found with that ID", 404)));

          case 5:
            res.status(204).json({
              status: 'success',
              requestedAt: req.requestTime,
              data: null
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.updateOne = function (Model) {
  return catchAsync(function _callee2(req, res, next) {
    var doc;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Model.findByIdAndUpdate(req.params.id, req.body, {
              "new": true,
              runValidators: true
            }));

          case 2:
            doc = _context2.sent;

            if (doc) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", next(new AppError('No document found with that ID', 404)));

          case 5:
            res.status(200).json({
              status: 'success',
              data: {
                data: doc
              }
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

exports.createOne = function (Model) {
  return catchAsync(function _callee3(req, res, next) {
    var doc;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Model.create(req.body));

          case 2:
            doc = _context3.sent;
            res.status(201).json({
              status: 'success',
              requestedAt: req.requestTime,
              data: {
                data: doc
              }
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
};