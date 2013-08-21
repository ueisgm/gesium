/**
*	imgeus.js
*
*	Originally app.js, but I renamed it to imgeus.js since it's just
*	waaaaay cooler, dawg.
*/



//	Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');					// Used for filesystem crap

//	Routes
var main = require('./routes/main');

//	Configuration
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ 
    keepExtensions: true, 
    uploadDir: __dirname + '/tmp',
    limit: '2mb'
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//	Define routing for the application
app.get('/', main.home);
app.post('/', main.upload);



// SERVER START!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
