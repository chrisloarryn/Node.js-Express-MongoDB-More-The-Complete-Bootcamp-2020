"use strict";

var fs = require('fs');

var express = require('express');

var app = express();
app.use(express.json()); // app.get('/', (req, res) => {
//     res.status(200).json({
//       status: 'success',
//     message: `Hello from the server side! 😙`,
//     app: 'Natours',
//     ok: true,
//     data: [{ new1: 1 }, { new2: 2 }, { new3: 3 }, { new4: 4 }]
//   })
// })
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...')
// })

var tours = JSON.parse(fs.readFileSync("".concat(__dirname, "/dev-data/data/tours-simple.json")));

var getAllTours = function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

var getTour = function getTour(req, res) {
  var id = req.params.id * 1;
  var tour = tours.find(function (el) {
    return el.id === id;
  }); // if (id > tours.length) {

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    } // results: tours.length,
    // data: {
    //   tours
    // }

  });
};

var createTour = function createTour(req, res) {
  // console.log(req.body)
  var newId = tours[tours.length - 1].id + 1;
  var newTour = Object.assign({
    id: newId
  }, req.body);
  tours.push(newTour);
  fs.writeFile("".concat(__dirname, "/dev-data/data/tours-simple.json"), JSON.stringify(tours), function (err) {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

var updateTour = function updateTour(req, res) {
  // if (!tour) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  });
};

var deleteTour = function deleteTour(req, res) {
  // if (!tour) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: null
  });
}; // // Tours
// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)


app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours:id').get(getTour).patch(updateTour)["delete"](deleteTour);
var port = process.env.port || 3000;
app.listen(port, function () {
  console.log("App running on port ".concat(port, "... \uD83D\uDE0A"));
});