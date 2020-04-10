"use strict";

var express = require('express');

var tourController = require('./../controllers/tourController');

var authController = require('./../controllers/authController');

var reviewRouter = require('./../routes/reviewRoutes');

var router = express.Router(); // POST /tour/34qwres/reviews
// GET /tour/34qwres/reviews

router.use('/:tourId/reviews', reviewRouter); // router.param('id', tourController.checkID) , tourController.getAllTours

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);
router.route('/').get(tourController.getAllTours).post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.updateTour)["delete"](authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);
module.exports = router;