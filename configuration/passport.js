/**
*	Configuration: passport.js
*
*	Configures and defines the behavior for the passport module. Set up the 
*	'strategies' used for SSO (single sign on) for various applications here.
*/

var mongoose = require('mongoose');
var databaseLink = 'mongodb://localhost/imgeus';			// use the imgeus database
var database = mongoose.createConnection(databaseLink);
var userSchema = require('../models/user');
var User = database.model('user', userSchema);
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var usersController = require('../controllers/users');
var config = require('./config.json');

module.exports = function(passport) {
	
	passport.use(
		new FacebookStrategy({
			clientID: config.facebook_client_id,
			clientSecret: config.facebook_client_secret,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},	
		function(accessToken, refreshToken, profile, done) {
			usersController.authenticateFacebook(profile, done);
		})	
	);

	passport.use(
			new LocalStrategy({
				usernameField: 'email',
				passwordField: 'password'
    		},
    		function(email, password, done) {
    			usersController.authenticateImgeus(email, password, done);
    		})
	);

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({ _id: id }, function (err, user) {
			done(err, user);
		});
	});

}