const express = require('express')
const viewsController = require('./../controllers/viewsController')
const router = express.Router()
const authController = require('./../controllers/authController')

// router.use(authController.isLoggedIn)

router.get('/', authController.isLoggedIn, viewsController.getOverview)
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour)
router.get('/login', viewsController.getLoginForm)
router.get('/me', authController.protect, viewsController.getAccount)

router.post('/submit-user-data', viewsController.updateUserData)

module.exports = router
