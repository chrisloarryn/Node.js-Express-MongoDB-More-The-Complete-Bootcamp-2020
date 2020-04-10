"use strict";var crypto=require("crypto"),_require=require("util"),promisify=_require.promisify,jwt=require("jsonwebtoken"),User=require("../models/userModel"),catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError"),sendEmail=require("./../utils/email"),signToken=function(e){return jwt.sign({id:e},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})},createSendToken=function(e,r,t){var n=signToken(e._id),s={expires:new Date(Date.now()+24*process.env.JWT_COOKIE_EXPIRES_IN*60*60*1e3),httpOnly:!0};"production"===process.env.NODE_ENV&&(s.secure=!0),t.cookie("jwt",n,s),e.password=void 0,t.status(r).json({status:"success",token:n,data:{user:e}})};exports.signup=catchAsync(function(r,t){var n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.create({name:r.body.name,email:r.body.email,role:r.body.role,password:r.body.password,passwordConfirm:r.body.passwordConfirm,passwordChangedAt:r.body.passwordChangedAt}));case 2:n=e.sent,createSendToken(n,201,t);case 4:case"end":return e.stop()}})}),exports.login=catchAsync(function(r,t,n){var s,a,o,i;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(s=r.body,a=s.email,o=s.password,a&&o){e.next=3;break}return e.abrupt("return",n(new AppError("Please provide email and password!",400)));case 3:return e.next=5,regeneratorRuntime.awrap(User.findOne({email:a}).select("+password"));case 5:if(i=e.sent,e.t0=!i,e.t0){e.next=11;break}return e.next=10,regeneratorRuntime.awrap(i.correctPassword(o,i.password));case 10:e.t0=!e.sent;case 11:if(e.t0)return e.abrupt("return",n(new AppError("Incorrect email or password (or user is inactive)",401)));e.next=13;break;case 13:createSendToken(i,200,t);case 14:case"end":return e.stop()}})}),exports.protect=catchAsync(function(r,e,t){var n,s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(r.headers.authorization&&r.headers.authorization.startsWith("Bearer")&&(n=r.headers.authorization.split(" ")[1]),n){e.next=3;break}return e.abrupt("return",t(new AppError("Your are not logged in! Please log in to get access.",401)));case 3:return e.next=5,regeneratorRuntime.awrap(promisify(jwt.verify)(n,process.env.JWT_SECRET));case 5:return s=e.sent,e.next=8,regeneratorRuntime.awrap(User.findById(s.id));case 8:if(a=e.sent){e.next=11;break}return e.abrupt("return",t(new AppError("The user belonging to this token does not longer exist.",401)));case 11:if(a.changedPasswordAfter(s.iat))return e.abrupt("return",t(new AppError("User recently changed password! Please log in again.",401)));e.next=13;break;case 13:r.user=a,t();case 15:case"end":return e.stop()}})}),exports.restrictTo=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(e,r,t){if(!n.includes(e.user.role))return t(new AppError("You do not have permission to perform this action",403));t()}},exports.forgotPassword=catchAsync(function(r,t,n){var s,a,o,i;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.findOne({email:r.body.email}));case 2:if(s=e.sent){e.next=5;break}return e.abrupt("return",n(new AppError("There is no user with email address.",404)));case 5:return a=s.createPasswordResetToken(),e.next=8,regeneratorRuntime.awrap(s.save({validateBeforeSave:!1}));case 8:return o="".concat(r.protocol,"://").concat(r.get("host"),"/api/v1/users/resetPassword/").concat(a),i="Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ".concat(o,".\n If you didn't forget your password, please ignore this email"),e.prev=10,e.next=13,regeneratorRuntime.awrap(sendEmail({email:s.email,subject:"Your password reset token (valid for 10 min)",message:i}));case 13:t.status(200).json({status:"success",message:"Token sent to email!"}),e.next=23;break;case 16:return e.prev=16,e.t0=e.catch(10),s.passwordResetToken=void 0,s.passwordResetExpires=void 0,e.next=22,regeneratorRuntime.awrap(s.save({validateBeforeSave:!1}));case 22:return e.abrupt("return",n(new AppError("There was an error sending the email. Try again later!",500)));case 23:case"end":return e.stop()}},null,null,[[10,16]])}),exports.resetPassword=catchAsync(function(r,t,n){var s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return s=crypto.createHash("sha256").update(r.params.token).digest("hex"),e.next=3,regeneratorRuntime.awrap(User.findOne({passwordResetToken:s,passwordResetExpires:{$gt:Date.now()}}));case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",n(new AppError("Token is invalid or has expired",400)));case 6:return a.password=r.body.password,a.passwordConfirm=r.body.passwordConfirm,a.passwordResetToken=void 0,a.passwordExpires=void 0,e.next=12,regeneratorRuntime.awrap(a.save());case 12:createSendToken(a,200,t);case 13:case"end":return e.stop()}})}),exports.updatePassword=catchAsync(function(r,t,n){var s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.findById(r.user.id).select("+password"));case 2:return s=e.sent,e.next=5,regeneratorRuntime.awrap(s.correctPassword(r.body.passwordCurrent,s.password));case 5:if(e.sent){e.next=7;break}return e.abrupt("return",n(new AppError("Your current password is wrong.",401)));case 7:return s.password=r.body.password,s.passwordConfirm=r.body.passwordConfirm,e.next=11,regeneratorRuntime.awrap(s.save());case 11:createSendToken(s,200,t);case 12:case"end":return e.stop()}})});