const express = require('express')
// const {
//   getAllTours,
//   createTour,
//   getTour,
//   updateTour,
//   deleteTour
// } = require('./../controllers/tourController')
const tourController = require('./../controllers/tourController')
const router = express.Router()

router.param('id', tourController.checkID)

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 404 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router
