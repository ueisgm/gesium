/**
*	Routes: main.js
*
*	Main handler for routes for the Imgeus Application. This handler will 'handle'
* 	the route calls accordingly (duh). To enforce the abstraction / stack layer,
*	let's say that the calls MUST ONLY be to appropriate controllers! The module
*	is roughly dvided into two parts: GET and POST requests.
*/


//	Controller modules
var imagesController = require('../controllers/images');
var usersController = require('../controllers/users');
var async = require('async');

/*** GET (HTTP METHOD) REQUESTS ***/

exports.home = function(request, response) {		// Imgeus home page
	response.render('index');
}

exports.display = function(request, response) {		// displays a single picture
	var id = request.params.id;
	response.render('display', {id: id});
}

exports.login = function(request, response) {		// login screen display
	response.render('login');
}

exports.success = function(request, response) {		// hooray! you succeeded in something (placeholder)
	response.render('success');
}

exports.profile = function(request, response) { 	// display user profile
	if(request.isAuthenticated()) {
		var urls = [];
		var count = 0;
		for (var i = 0; i < request.user.uploads.length; i++) {
			async.parallel([
				function(callback) {	
					imagesController.getURL(request.user.uploads[i], callback);		
				}
			],
			function(err, results) {
				urls.push(results);
				count++;
				if (count == request.user.uploads.length) {
					response.render('profile', { user : request.user, urls : urls});
				}
			});
		}
	}
	else {
		response.render('login');
	}
}

exports.logout = function(request, response) {		// log out
	request.logout();
	response.render('login');
}

/*** POST (HTTP METHOD) REQUESTS ***/

/**
	Function: upload
		Called when a post request is made when a picture is uploaded 
		from the home page.
*/
exports.upload = function(request, response) {

	var data = new Object();
	data.name = request.files.image.name;
	data.size = request.files.image.size;
	data.type = request.files.image.type;
	data.path = request.files.image.path;
	
	if (request.isAuthenticated()) {
		data.uploaded_by = request.user._id;
	}

	var imageId = imagesController.saveImage(data, response);

	if (request.isAuthenticated()) {	
		usersController.addImageToUser(request.user._id, imageId);
	}
}

/**
	function: signup
		Handles a signing up procedure.
*/
exports.signup = function(request, response) {
	usersController.register(request.body.email, request.body.password);
	response.render('success');
}