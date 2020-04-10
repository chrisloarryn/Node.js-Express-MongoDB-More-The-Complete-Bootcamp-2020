"use strict";

var fs = require('fs');

var dotenv = require('dotenv');

var mongoose = require('mongoose');

var Tour = require('./../../models/tourModel');

dotenv.config({
  path: './config.env'
}); // DB is to connect to atlas.

var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); // || process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function (con) {
  console.log("DB Connection Successfully \uD83D\uDE01");
}); // READ JSON FILE

var tours = JSON.parse(fs.readFileSync("".concat(__dirname, "/tours.json"), 'utf-8')); // IMPORT DATA INTO DB

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Tour.create(tours));

        case 3:
          console.log("Data successfully loaded! \uD83D\uDE01");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 9:
          process.exit();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; // DELETE ALL DATA FROM DB


var deleteData = function deleteData() {
  return regeneratorRuntime.async(function deleteData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tour.deleteMany());

        case 3:
          console.log("Data successfully deleted! \uD83D\uDE0F");
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 9:
          process.exit();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; // EXPORT DATA INTO DB


var exportData = function exportData() {
  var _tours;

  return regeneratorRuntime.async(function exportData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Tour.find());

        case 3:
          _tours = _context3.sent;

          if (_tours.length) {
            fs.writeFile("".concat(__dirname, "./tours-simple.json"), JSON.stringify(_tours), function (err) {
              console.log(err);
            });
          }

          console.log("Dev-data successfully updated! \uD83D\uDE01");
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
          process.exit();

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--export') {
  exportData();
}

console.log(process.argv);