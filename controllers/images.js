/**
*	Controller: images.js
*
*	Controller for image model. Handles the saving of the images to the 
*	filesystem and the database, and other crap
*/
	

//	Database configuration
var mongoose = require('mongoose');
var databaseLink = 'mongodb://localhost/imgeus';			// use the imgeus database
var database = mongoose.createConnection(databaseLink);

var imageSchema = require('../models/image');
var Image = database.model('image', imageSchema);


/**
	Function: 	saveImage
		
		@param request	: 	request thingy uhh iunno

		Called by the main.js(routes) by a post request in the main
		page. For now, it simply parses the request and saves it in the
		database.
*/
function saveImage(request) { 
	var name = request.files.image.name;
	var url = generateRandomURL(10, 'abcdefghijklmnopqrstuvwxyz01234567890'); // for now
	var size = request.files.image.size;
	var type = request.files.image.type;


	var image = new Image({
		name	: 	name,
		url		: 	url,
		size	: 	size
	});

	image.save();
	console.log(name);
	console.log(size);
	console.log(type);
};


// TODO:
function loadImage() {
	//TODO:
};

// TODO: we should bring this out to a images_helper class or something
function generateRandomURL(length, chars) {
	var output = '';
	for (var i = length; i > 0; i--) {
		output += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return output;
};


exports.saveImage = saveImage;
exports.loadImage = loadImage;