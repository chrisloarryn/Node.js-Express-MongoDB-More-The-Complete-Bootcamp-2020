"use strict";

var Tour = require('./../models/tourModel');

var APIFeatures = require('./../utils/apiFeatures');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

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

exports.getAllTours = catchAsync(function _callee2(req, res, next) {
  var features, tours;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // EXECUTE QUERY
          features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
          _context2.next = 3;
          return regeneratorRuntime.awrap(features.query);

        case 3:
          tours = _context2.sent;
          // SEND RESPONSE
          res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
              tours: tours
            }
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getTour = catchAsync(function _callee3(req, res, next) {
  var tour;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Tour.findById(req.params.id).populate('reviews'));

        case 2:
          tour = _context3.sent;

          if (tour) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(new AppError('No tour found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.createTour = catchAsync(function _callee4(req, res, next) {
  var newTour;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Tour.create(req.body));

        case 2:
          newTour = _context4.sent;
          res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
              tour: newTour
            }
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.updateTour = catchAsync(function _callee5(req, res, next) {
  var tour;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Tour.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          tour = _context5.sent;

          if (tour) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new AppError('No tour found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteTour = catchAsync(function _callee6(req, res, next) {
  var tour;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Tour.findByIdAndDelete(req.params.id));

        case 2:
          tour = _context6.sent;

          if (tour) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new AppError('No tour found with that ID', 404)));

        case 5:
          res.status(204).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: null
          }); // res.status(201).json({
          //   status: 'success',
          //   requestedAt: req.requestTime,
          //   data: null
          // })

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.getTourStats = catchAsync(function _callee7(req, res, next) {
  var stats;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
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
          stats = _context7.sent;
          res.status(200).json({
            status: 'success',
            data: {
              stats: stats
            }
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.getMonthlyPlan = catchAsync(function _callee8(req, res, next) {
  var year, plan;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          year = req.params.year * 1; // 2021

          _context8.next = 3;
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
          plan = _context8.sent;
          res.status(200).json({
            status: 'success',
            data: {
              plan: plan
            }
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});