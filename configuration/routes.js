/**
*	Configuration: routes.js
*
*	Defines the routes and the http api calls for the application. Tells
*	Imgeus the corresponding actions to take for each defined calls.
*/

var main = require('../routes/main');
var usersController = require('../controllers/users');

module.exports = function(app, passport) {

	// Main home page
	app.get('/', main.home);
	app.post('/', main.upload);

	// Sign Up
	app.post('/signup', main.signup);
	app.get('/success', main.success);

	// Imgeus Log In (Local)
	app.get('/login', main.login);
	app.post('/login', 
		passport.authenticate('local', { successRedirect : '/profile',
										 failureRedirect : '/login' }));

	// Facebook Authentication
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : "email"}));
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { successRedirect: '/profile',
	                                      	failureRedirect: '/login' }));

	// User Profile / Gallery
	app.get('/profile', main.profile);

	// Log Out
	app.get('/logout', main.logout);

	// Simple image display
	app.get('/:id', main.display);
}