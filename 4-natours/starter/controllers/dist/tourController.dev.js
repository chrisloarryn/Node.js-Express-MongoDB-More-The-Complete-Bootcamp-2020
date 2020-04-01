"use strict";

var Tour = require('./../models/tourModel');

var APIFeatures = require('./../utils/apiFeatures');

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

exports.getAllTours = function _callee2(req, res) {
  var features, tours;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // BUILD QUERY
          // 4) Pagination
          // const page = req.query.page * 1 || 1
          // const limit = req.query.limit * 1 || 100
          // const skip = (page - 1) * limit
          // query = query.skip(skip).limit(limit)
          // if (req.query.page) {
          //   const numTours = await Tour.countDocuments()
          //   if (skip >= numTours) throwError('This page does not exist 😏')
          // }
          // EXECUTE QUERY
          features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
          _context2.next = 4;
          return regeneratorRuntime.awrap(features.query);

        case 4:
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
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            status: 'fail',
            message: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getTour = function _callee3(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.findById(req.params.id));

        case 3:
          tour = _context3.sent;
          // const tour = await Tour.findOne({ _id: req.params.id})
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            status: 'fail',
            message: _context3.t0
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createTour = function _callee4(req, res) {
  var newTour;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Tour.create(req.body));

        case 3:
          newTour = _context4.sent;
          res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
              tour: newTour
            }
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            status: 'fail',
            message: "".concat(_context4.t0, " \uD83D\uDE05")
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateTour = function _callee5(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Tour.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 3:
          tour = _context5.sent;
          res.status(200).json({
            status: 'success',
            data: {
              tour: tour
            }
          });
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(404).json({
            status: 'fail',
            message: _context5.t0
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteTour = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Tour.findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: null
          });
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          res.status(404).json({
            status: 'fail',
            message: _context6.t0
          });

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.getTourStats = function _callee7(req, res) {
  var stats;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
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

        case 3:
          stats = _context7.sent;
          res.status(200).json({
            status: 'success',
            data: {
              stats: stats
            }
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(404).json({
            status: 'fail',
            message: _context7.t0
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getMonthlyPlan = function _callee8(req, res) {
  var year, plan;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          year = req.params.year * 1; // 2021

          _context8.next = 4;
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

        case 4:
          plan = _context8.sent;
          res.status(200).json({
            status: 'success',
            data: {
              plan: plan
            }
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          res.status(404).json({
            status: 'fail',
            message: _context8.t0
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};