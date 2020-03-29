"use strict";

var fs = require('fs'); // 1) READ FILE


var tours = JSON.parse(fs.readFileSync("".concat(__dirname, "/../dev-data/data/tours-simple.json")));

exports.checkID = function (req, res, next, val) {
  // console.log(`Tour id is: (${val})`)
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: "Invalid ID (".concat(val, ")")
    });
  }

  next();
};

exports.checkBody = function (req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: "Missing name or price \uD83D\uDE1F"
    });
  }

  next();
}; // 2) ROUTE HANDLERS


exports.getAllTours = function (req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

exports.getTour = function (req, res) {
  console.log(req.params); // => return {id: tourId}

  var id = req.params.id * 1;
  var tour = tours.find(function (el) {
    return el.id === id;
  });
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour: tour
    }
  });
};

exports.createTour = function (req, res) {
  // console.log(req.body)
  var newId = tours[tours.length - 1].id + 1;
  var newTour = Object.assign({
    id: newId
  }, req.body);
  tours.push(newTour);
  fs.writeFile("".concat(__dirname, "/dev-data/data/tours-simple.json"), JSON.stringify(tours), function (err) {
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour: newTour
      }
    });
  });
};

exports.updateTour = function (req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  });
};

exports.deleteTour = function (req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: null
  });
};