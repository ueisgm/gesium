/**
*	imgeus.js
*
*	Originally app.js, but I renamed it to imgeus.js since it's just
*	waaaaay cooler, dawg. And my OCD kicked in so I had to organize
*	crap
*/


//	Module Imports
var http = require('http');
var path = require('path');
var passport = require("passport");
var express = require('express');
var app = express();


//	Configure/initialize imgeus Application
var configure_application = require('./configuration/application');
var configure_passport = require('./configuration/passport');
var configure_routes = require('./configuration/routes');

configure_application(app, express, passport);
configure_passport(passport);
configure_routes(app, passport);


// SERVER START!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
