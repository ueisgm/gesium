/**
*	Controller: images.js
*
*	Controller for image model. Handles the saving of the images to the 
*	filesystem and the database, and other crap.
*/

var fs = require('fs');	
var config = require('../configuration/config.json');

//	Database configuration
var mongoose = require('mongoose');
var databaseLink = 'mongodb://localhost/imgeus';			// use the imgeus database
var database = mongoose.createConnection(databaseLink);
var imageSchema = require('../models/image');
var Image = database.model('image', imageSchema);

/**
	Function: 	saveImage
		Called by the main.js(routes) by a post request in the main
		page. For now, it simply parses the request and saves it in the
		database.

		@param data: 	data bundle containing name, size, type and more goodies!

		@return: the random unique url
*/
function saveImage(data, response) { 

	var name = data.name;
	var size = data.size;
	var type = data.type;
	var tempPath = data.path;
	var uploaded_by = data.uploaded_by;
	var url = generateRandomURL(10, 'abcdefghijklmnopqrstuvwxyz01234567890'); // for now
	var savePath = config.upload_directory + url; // for now

	var image = new Image ({
		name			: 	name,
		url				: 	url,
		size			: 	size,
		type			: 	type,
		uploaded_by 	: 	uploaded_by,
		time_uploaded 	: 	Date.now(),
		view_count		: 	0,
		bandwidth		: 	0

	});

	image.save(function(err, image) {
		moveImage(tempPath, savePath);
		loadImage(image._id, response);
	});						// save to database MONGODB!		// then move image from tmp directory to the correct upload directory
	return image._id;
};


/**
	Function: 	loadImage
		This fuction loads and renders the image.

		@param id: 			unique identifier of the image, used in the URL
		@param response: 	that thingy that renders thing
*/
function loadImage(id, response) {
	Image.findOne({_id : id}, function(err, image) {
		response.render('display', {id: image.url});
	});
};


// TODO:
function updateImage(data) {

};


// TODO:
function deleteImage(id) {

};

function getURL(id) {
	Image.findOne({_id : id}, function(err, image) {
		console.log("(images.js) database callback: " + image.url);
		return image.url;
	});
}
//--- Helpers ---//

// TODO: we should bring this out to a images_helper class or something
function generateRandomURL(length, chars) {
	var output = '';
	for (var i = length; i > 0; i--) {
		output += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return output;
};


function moveImage(from, to) {
    fs.rename(from, to, function(error) {
     	if(error) {
     		// TODO: Do Something / log it somewhere
     		console.log('Error while moving image');
     	}
    }); 
}


exports.saveImage = saveImage;
exports.loadImage = loadImage;
exports.getURL = getURL;