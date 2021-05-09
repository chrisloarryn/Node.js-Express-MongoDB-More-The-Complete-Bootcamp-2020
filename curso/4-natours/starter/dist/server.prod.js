"use strict";var mongoose=require("mongoose"),dotenv=require("dotenv");process.on("uncaughtException",function(o){console.log("▶️ ".concat(o," ◀️")),console.log("UNCAUGHT REJECTION! 💥 Shutting down..."),process.exit(1)}),dotenv.config({path:"./config.env"});var app=require("./app"),DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);mongoose.connect(DB,{useNewUrlParser:!0,useCreateIndex:!0,useFindAndModify:!1,useUnifiedTopology:!0}).then(function(o){console.log("DB Connection Successfully! 😁")});var port=process.env.PORT||3e3,server=app.listen(port,function(){console.log("App running on port ".concat(port,"... 😊"))});process.on("unhandledRejection",function(o){console.log("▶️ ".concat(o.name,": ").concat(o.message," ◀️")),console.log("UNHANDLED REJECTION! 💥 Shutting down..."),server.close(function(){process.exit(1)})});