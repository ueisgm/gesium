/**
*	Routes: main.js
*
*	Main handler for routes for the Imgeus Application
*/

var imagesController = require('../controllers/images');


/**
	Fuction: home
		Home page of the application. Renders home.jade
*/
exports.home = function(request, response) {
	response.render('index');
};


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

	var id = imagesController.saveImage(data);

	imagesController.loadImage(id, response);
};


/**
	Function: display
		Displays the image specified the unique url.
*/
exports.display = function(request, response) {
	var id = request.params.id;
	imagesController.loadImage(id, response);
};