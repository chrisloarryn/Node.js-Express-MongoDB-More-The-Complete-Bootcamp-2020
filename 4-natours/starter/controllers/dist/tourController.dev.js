"use strict";

var Tour = require('./../models/tourModel');

var APIFeatures = require('./../utils/apiFeatures');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var factory = require('./handlerFactory');

exports.aliasTopTours = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.query.limit = '5';
          req.query.sort = '-ratingsAverage,price';
          req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, {
  path: 'reviews'
});
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.getTourStats = catchAsync(function _callee2(req, res, next) {
  var stats;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $match: {
              ratingsAverage: {
                $gte: 4.5
              }
            }
          }, {
            $group: {
              // _id: '$ratingsAverage',
              // _id: '$difficulty',
              _id: {
                $toUpper: '$difficulty'
              },
              num: {
                $sum: 1
              },
              numRatings: {
                $sum: '$ratingsQuantity'
              },
              avgRating: {
                $avg: '$ratingsAverage'
              },
              avgPrice: {
                $avg: '$price'
              },
              minPrice: {
                $min: '$price'
              },
              maxPrice: {
                $max: '$price'
              }
            }
          }, {
            $sort: {
              avgPrice: 1
            }
          } // {
          //   $match: { _id: { $ne: 'EASY' } }
          // }
          ]));

        case 2:
          stats = _context2.sent;
          res.status(200).json({
            status: 'success',
            data: {
              stats: stats
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getMonthlyPlan = catchAsync(function _callee3(req, res, next) {
  var year, plan;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          year = req.params.year * 1; // 2021

          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.aggregate([{
            $unwind: '$startDates'
          }, {
            $match: {
              startDates: {
                $gte: new Date("".concat(year, "-01-01")),
                $lte: new Date("".concat(year, "-12-31"))
              }
            }
          }, {
            $group: {
              _id: {
                $month: '$startDates'
              },
              numTourStarts: {
                $sum: 1
              },
              tours: {
                $push: '$name'
              }
            }
          }, {
            $addFields: {
              month: '$_id'
            }
          }, {
            $project: {
              _id: 0
            }
          }, {
            $sort: {
              numTourStarts: -1
            }
          } // {
          //   $limit: 6
          // }
          ]));

        case 3:
          plan = _context3.sent;
          res.status(200).json({
            status: 'success',
            data: {
              plan: plan
            }
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});