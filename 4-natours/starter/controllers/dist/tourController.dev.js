"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var Tour = require('./../models/tourModel'); // 2) ROUTE HANDLERS


exports.getAllTours = function _callee(req, res) {
  var queryObj, excludedFields, queryStr, query, sortBy, fields, page, limit, skip, numTours, tours;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // BUILD QUERY
          // 1) FILTERING
          queryObj = _objectSpread({}, req.query);
          excludedFields = ['page', 'sort', 'limit', 'fields'];
          excludedFields.forEach(function (el) {
            return delete queryObj[el];
          }); // 1B) Advanced filtering

          queryStr = JSON.stringify(queryObj);
          queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
            return "$".concat(match);
          });
          query = Tour.find(JSON.parse(queryStr)); // 2) Sorting  => price or -price

          if (req.query.sort) {
            sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
          } else {
            query = query.sort('-createdAt');
          } // 3) Field limiting  =>  show only some fields


          if (req.query.fields) {
            fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
          } else {
            query = query.select('-__v');
          } // 4) Pagination


          page = req.query.page * 1 || 1;
          limit = req.query.limit * 1 || 100;
          skip = (page - 1) * limit;
          query = query.skip(skip).limit(limit);

          if (!req.query.page) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(Tour.countDocuments());

        case 16:
          numTours = _context.sent;
          if (skip >= numTours) throwError('This page does not exist 😏');

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(query);

        case 20:
          tours = _context.sent;
          // SEND RESPONSE
          res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
              tours: tours
            }
          });
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            status: 'fail',
            message: _context.t0
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
};

exports.getTour = function _callee2(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tour.findById(req.params.id));

        case 3:
          tour = _context2.sent;
          // const tour = await Tour.findOne({ _id: req.params.id})
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            status: 'fail',
            message: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createTour = function _callee3(req, res) {
  var newTour;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.create(req.body));

        case 3:
          newTour = _context3.sent;
          res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
              tour: newTour
            }
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            status: 'fail',
            message: "".concat(_context3.t0, " \uD83D\uDE05")
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateTour = function _callee4(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Tour.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 3:
          tour = _context4.sent;
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            status: 'fail',
            message: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteTour = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Tour.findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: null
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(404).json({
            status: 'fail',
            message: _context5.t0
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
};