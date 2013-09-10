/**
*	Controller: images.js
*
*	Controller for image model. Handles the saving of the images to the 
*	filesystem and the database, and other crap.
*/

var fs = require('fs');	
var async = require('async');
var config = require('../configuration/config.json');
var easyimg = require('easyimage');

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

		@param data 	: 	data bundle containing name, size, type and more goodies!

		@return: the random unique url
*/
function saveImage(data, callback) { 

	var name = data.name;
	var size = data.size;
	var type = data.type;
	var tempPath = data.path;
	var uploaded_by = data.uploaded_by;
	var url = generateRandomURL(config.url_length, 'abcdefghijklmnopqrstuvwxyz01234567890'); // for now

	var savePath = getSavePath(url); // for now

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

	async.series(										
		[
			function(callback) {							// 1. save to Mongo DB
				image.save(function(err, image) {	
					callback(null, image);
				});
			},
			function(callback) {
				moveImage(tempPath, savePath, callback); 	// 2. move image from tmp directory to the correct upload directory
			},
			function(callback) {
				createThumbnail(savePath, callback);		// 3. create the thumbnail
			}
		],
		function(err, results) {
			callback(null, results[0]);						// 3. return the image object
		}
	);
}


/**
	findImage : retrieves the image object from the database from the unique _id of image

	@param	_id 	: 	unique id of the image record/object
	@param callback : 	used to signal async series procedure - returns the image object
*/
function findImage(_id, callback) {
	Image.findOne({_id : _id}, function(err, image) {
		callback(null, image);
	});
}


function updateImage(id, data, callback) {
	// TODO!
}


function deleteImage(_id) {
	// TODO!
}




//--- Helpers ---//
// TODO: we should bring this out to a images_helper class or something?

// Generates a random URL with the specified length and a given set of characters
function generateRandomURL(length, chars) {
	var output = '';
	for (var i = length; i > 0; i--) {
		output += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return output;
};


// Move an image (or a file) from a [from path] to a [to path]
function moveImage(from, to, callback) {
    fs.rename(from, to, function(error) {
     	if(error) {
     		console.log('Error while moving image');
     	}
     	callback(null);
    }); 
}


// Given an image url, create 'index' directories as discussed. Return the path
function getSavePath(url) {

	// Get the 'indices' first two characters, and the next two characters!
	var indexOne = config.upload_directory + url.substring( (url.length-config.url_length), (url.length-config.url_length + 2) );
	var indexTwo = indexOne + "/" + url.substring( (url.length-config.url_length) + 2, (url.length-config.url_length + 4) );
	var path = indexTwo + "/" + url.substring(url.length-config.url_length + 4);

	// create directories if they don't exist
	if(!fs.existsSync(indexOne)) {
		fs.mkdirSync(indexOne);
		fs.mkdirSync(indexTwo);
	}
	if(!fs.existsSync(indexTwo)) {
		fs.mkdirSync(indexTwo);
	}

	return path;		// return the final save path
}


// creates a thumbnail image of the image specified by the imagePath
function createThumbnail(imagePath, callback) {
	easyimg.thumbnail(
		{
			src		: 	imagePath, 
			dst		: 	imagePath+'_thumb',
			width	: 	128, 
			height	: 	128,
			x		: 	0, 
			y		: 	0
		},
		function(err, image) {
			if (err) throw err;
			callback(null);
		}
	);
}

exports.saveImage = saveImage;
exports.findImage = findImage;
exports.getSavePath = getSavePath;