const express = require('express')
const bookingController = require('./../controllers/bookingController')
const authController = require('./../controllers/authController')

const router = express.Router({ mergeParams: true })

// Protect all routes after this middleware
router.use(authController.protect)

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession)

// Restrict all routes after this middleware
router.use(authController.restrictTo('admin', 'lead-guide'))
router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking)

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking)
  
module.exports = router
