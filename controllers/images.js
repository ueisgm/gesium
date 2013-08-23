/**
*	Controller: images.js
*
*	Controller for image model. Handles the saving of the images to the 
*	filesystem and the database, and other crap
*/

var fs = require('fs');	
var config = require('../configuration.json');

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

		@param request: 	request thingy uhh iunno

		@return: the random unique url
*/
function saveImage(data) { 
	var name = data.name;
	var size = data.size;
	var type = data.type;
	var tempPath = data.path;
	var url = generateRandomURL(10, 'abcdefghijklmnopqrstuvwxyz01234567890'); // for now
	var savePath = config.upload_directory + url; // for now

	var image = new Image ({
		name	: 	name,
		url		: 	url,
		size	: 	size
	});

	image.save();						// save to database MONGODB!
	moveImage(tempPath, savePath);		// then move image from tmp directory to the correct upload directory

	return url;							
};


/**
	Function: 	loadImage
		This fuction loads and renders the image.

		@param id: 			unique identifier of the image, used in the URL
		@param response: 	that hhingy that renders thing
*/
function loadImage(id, response) {
	// for now, just display. There will be db queries as the application progresses
	response.render('display', {id: id});
};


// TODO:
function updateImage(data) {

};


// TODO:
function deleteImage(id) {

};


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