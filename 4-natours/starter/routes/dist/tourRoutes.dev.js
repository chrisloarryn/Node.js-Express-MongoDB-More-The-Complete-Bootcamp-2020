"use strict";

var express = require('express'); // const {
//   getAllTours,
//   createTour,
//   getTour,
//   updateTour,
//   deleteTour
// } = require('./../controllers/tourController')


var tourController = require('./../controllers/tourController');

var router = express.Router(); // router.param('id', tourController.checkID)
// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 404 (bad request)
// Add it to the post handler stack

router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour)["delete"](tourController.deleteTour);
module.exports = router;