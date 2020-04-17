"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.logout=exports.login=void 0;var _axios=_interopRequireDefault(require("axios")),_alerts=require("./alerts");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var login=function(t,r){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap((0,_axios.default)({method:"POST",url:"http://127.0.0.1:3000/api/v1/users/login",data:{email:t,password:r}}));case 3:"success"===e.sent.data.status&&((0,_alerts.showAlert)("success","Logged in successfully!"),window.setTimeout(function(){location.assign("/")},1500)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,_alerts.showAlert)("error",e.t0.response.data.message);case 10:case"end":return e.stop()}},null,null,[[0,7]])};exports.login=login;var logout=function(){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap((0,_axios.default)({method:"GET",url:"http://127.0.0.1:3000/api/v1/users/logout"}));case 3:(e.sent.data.status="success")&&location.reload(!0),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.response),(0,_alerts.showAlert)("error","Error logging out! Try again.");case 11:case"end":return e.stop()}},null,null,[[0,7]])};exports.logout=logout;