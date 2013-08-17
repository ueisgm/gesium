/**
	main.js

	Contains the main routing definitions for the Imgeus Application
*/


/**
*	Fuction: home
		Home page of the application. Renders home.jade
*/
exports.home = function(request, response) {
	response.render('home');
};


/**
	Function: upload
		Called when a post request is made when a picture is uploaded 
		from the home page.
*/
exports.upload = function(response, request) {
	request.end();
};