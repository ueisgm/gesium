/**
*	Controller: users.js
*
*	Controller for user model. Handles thingamacraps like registration and
*	authentication.
*/


var mongoose = require('mongoose');
var databaseLink = 'mongodb://localhost/imgeus';
var database = mongoose.createConnection(databaseLink);
var userSchema = require('../models/user');
var User = database.model('user', userSchema);


/**
	Function: register
		Register / signs up the user. Called by a post request (sign up).
*/
function register(email, password, done) {
	var user = new User ({
		email : email,
		password : password
	});
	user.save();
}

/**
	Function: validateAuthentication
		Checks if the user is authenticated in the application -
		i.e. does the user have a live session? If so, go on to
		the next route (call next()), if not, back to the LOGIN screen.
*/
function validateAuthentication(request) {
    if(request.isAuthenticated()){
        return request.user;
    }
    else {
        return false;
    }
}

/**
	Function: authenticateImgeus
		Attempts to authenticate the user with Imgeus (local/native) credentials.
		Checks to see if the user exists in the database. If so, return done()
		wtih the user record
*/
function authenticateImgeus(email, password, done){
	User.findOne({email : email}, function(err, user){
		if (err) {
			return done(err);
		}
		
		if (!user) {
			return done(null, false, { message : 'Incorrect email.' });
		}

		if (password == user.password) {
			return done(null, user);
		}
		else {
			done(null, false, {message : 'Incorrect password'});
		}
	});
}

/**
	Function: authenticateFacebook
		Authenticates the user with Facebook credentials. This function is called after 
		the API call to Facebook - so the user has already been authenticated by facebook.
		This function merely checks to see if the user exists in the database. 
		If so, return done() wtih the user record. If not, this should be the first time
		logging in with facebook, so just create a record in the database
*/
function authenticateFacebook(profile, done){
	User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
		if(err) {
			throw err;
		}

		if(user) {
			done(null, user);
		}
		else {
			User.create({
				email : profile.emails[0].value,
				facebook : {
					id:    profile.id,
					email: profile.emails[0].value,
					name:  profile.displayName
				}
			}, 
			function(err, user){
				if(err) throw err;
				done(null, user);
			});
		}
	});	
}

function addImageToUser(userID, imageID) {
	User.findOne({'_id' : userID}, function(err, user) {
		user.uploads.push(imageID);
		user.save();
	});
}

exports.register = register;
exports.authenticateImgeus = authenticateImgeus;
exports.authenticateFacebook = authenticateFacebook;
exports.validateAuthentication = validateAuthentication;

exports.addImageToUser = addImageToUser;