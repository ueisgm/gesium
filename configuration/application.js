/**
*	Configuration: application.js
*
*	Set up for the Imgeus Application.
*/

var path = require('path');

module.exports = function(app, express, passport) {
	app.configure(function () {
		app.set('port', process.env.PORT || 3000);
		app.set('views', __dirname + '/../views');
		app.set('view engine', 'ejs');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser({ 
		    keepExtensions: true, 
		    uploadDir: __dirname + '/../tmp',
		    limit: '2mb'
		}));

		//Session / Passport stuff
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'keyboard cat' }));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, '../public')));
	});

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
}