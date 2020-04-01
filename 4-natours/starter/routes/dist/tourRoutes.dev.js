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

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour)["delete"](tourController.deleteTour);
module.exports = router;