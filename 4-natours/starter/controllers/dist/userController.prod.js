"use strict";var User=require("./../models/userModel"),catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError"),filterObj=function(s){for(var e=arguments.length,t=new Array(1<e?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];var n={};return Object.keys(s).forEach(function(e){t.includes(e)&&(n[e]=s[e])}),n};exports.getAllUsers=catchAsync(function(e,s){var t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.find());case 2:t=e.sent,s.status(200).json({status:"success",results:t.length,data:{users:t}});case 4:case"end":return e.stop()}})}),exports.updateMe=catchAsync(function(s,t,r){var n,u;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(s.body.password||s.body.passwordConfirm)return e.abrupt("return",r(new AppError("This route is not for password updates. Please use /updateMyPassword",400)));e.next=2;break;case 2:return n=filterObj(s.body,"name","email"),e.next=5,regeneratorRuntime.awrap(User.findByIdAndUpdate(s.user.id,n,{new:!0,runValidators:!0}));case 5:u=e.sent,t.status(200).json({status:"success",user:u});case 7:case"end":return e.stop()}})}),exports.getUser=function(e,s){s.status(500).json({status:"error",requestedAt:e.requestTime,message:"This route is not yet defined! 😏"})},exports.createUser=function(e,s){s.status(500).json({status:"error",requestedAt:e.requestTime,message:"This route is not yet defined! 😏"})},exports.updateUser=function(e,s){s.status(500).json({status:"error",requestedAt:e.requestTime,message:"This route is not yet defined! 😏"})},exports.deleteUser=function(e,s){s.status(500).json({status:"error",requestedAt:e.requestTime,message:"This route is not yet defined! 😏"})};