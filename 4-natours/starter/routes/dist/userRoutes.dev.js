"use strict";

var express = require('express'); // const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser
// } = require('./../controllers/userController')


var userController = require('./../controllers/userController'); // 3) ROUTES


var router = express.Router();
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser)["delete"](deleteUser);
module.exports = router;