"use strict";require("@babel/polyfill");var _mapbox=require("./mapbox"),_login=require("./login"),mapBox=document.getElementById("map"),loginForm=document.querySelector(".form"),logOutBtn=document.querySelector(".nav__el--logout");if(mapBox){var locations=JSON.parse(mapBox.dataset.locations);(0,_mapbox.displayMap)(locations)}loginForm&&loginForm.addEventListener("submit",function(e){e.preventDefault();var o=document.getElementById("email").value,t=document.getElementById("password").value;(0,_login.login)(o,t)}),_login.logout&&logOutBtn.addEventListener("click",_login.logout);