"use strict";var express=require("express"),userController=require("./../controllers/userController"),authController=require("./../controllers/authController"),router=express.Router();router.post("/signup",authController.signup),router.post("/login",authController.login),router.post("/forgotPassword",authController.forgotPassword),router.patch("/resetPassword/:token",authController.resetPassword),router.patch("/updateMyPassword",authController.protect,authController.updatePassword),router.patch("/updateMe",authController.protect,userController.updateMe),router.route("/").get(userController.getAllUsers).post(userController.createUser),router.route("/:id").get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser),module.exports=router;