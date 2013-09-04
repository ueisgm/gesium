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
	imagesController(id, response);
}

exports.login = function(request, response) {		// login screen display
	response.render('login');
}

exports.success = function(request, response) {		// hooray! you succeeded in something (placeholder)
	response.render('success');
}

exports.profile = function(request, response) { 	// display user profile
	
	// if the user is logged in, find all the urls
	if(request.isAuthenticated()) {			
		var urls = [];

		if (request.user.uploads.length == 0) {
			// if the user has no uploads, still display the profile!
			response.render('profile', { user : request.user, urls : urls});
		}

		// for all the uploaded images by the user, find the URLs of the images. SNYNCHRONOUSLY!
		for (var i = 0; i < request.user.uploads.length; i++) {
			async.series(
				[			
					function(callback) {	
						imagesController.getURL(request.user.uploads[i], callback);		
					}
				],
				function(err, results) {
					urls.push(results);
					if (urls.length == request.user.uploads.length) {		// only render when all the urls have been retrieved
						response.render('profile', { user : request.user, urls : urls});
					}
				}
			);
		}

	}

	// if the user is not logged in, render the login page
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

	var data = new Object();				// a data object to bundle up the info to store image data
	data.name = request.files.image.name;
	data.size = request.files.image.size;
	data.type = request.files.image.type;
	data.path = request.files.image.path;
	
	if (request.isAuthenticated()) {		// if an user is logged in, image has an uploaded_by property
		data.uploaded_by = request.user._id;
	}

	var imageId;					// the unique image _id of the uploaded image

	async.series(
		[
			function(callback) {	// force synchronous function call; save image and find the image id
				imageId = imagesController.saveImage(data, callback);		// TODO: WARNING! THIS JUST MIIIIIGHT MAYBE CAUSE AN ISSUE - 
																			// May call back first before returning the value. Will have to watch out for it
			}
		],
		function(err, results) {	// after the function finishes, load image and link image to a user
			imagesController.loadImage(imageId, response);
			if (request.isAuthenticated()) {	
				usersController.addImageToUser(request.user._id, imageId);
			}
		}
	);

}

/**
	function: signup
		Handles a signing up procedure.
*/
exports.signup = function(request, response) {
	usersController.register(request.body.email, request.body.password);
	response.render('success');
}