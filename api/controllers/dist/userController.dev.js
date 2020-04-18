"use strict";

var multer = require('multer');

var sharp = require('sharp'); // img processing library


var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var factory = require('./handlerFactory'); // const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users')
//   },
//   filename: (req, file, cb) => {
//     // user-_id-timestamp -> user-ssdafasdfsa3223-231312312123
//     const ext = file.mimetype.split('/')[1]
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// })


var multerStorage = multer.memoryStorage();

var multerFilter = function multerFilter(req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

var upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          req.file.filename = "user-".concat(req.user.id, "-").concat(Date.now(), ".jpeg");
          _context.next = 5;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({
            quality: 90
          }).toFile("public/img/users/".concat(req.file.filename)));

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});

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

exports.getMe = function (req, res, next) {
  req.params.id = req.user.id;
  next();
};

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
          filteredBody = filterObj(req.body, 'name', 'email');
          if (req.file) filteredBody.photo = req.file.filename; // 3) Update user document

          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 6:
          updatedUser = _context2.sent;
          res.status(200).json({
            status: 'success',
            user: updatedUser
          });

        case 8:
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

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: 'This route is not yet defined! Please use sign up instead😏'
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User); // Do NOT update passwords with this

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);