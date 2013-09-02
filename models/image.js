/**
*	Model: image.js
*
*	Image model
*/


var Schema = require('mongoose').Schema;

var imageSchema = new Schema ({
	name			:	String,
	url				: 	String,
	size			:  	String,
	type			: 	String,
	uploaded_by		: 	String,
	time_uploaded	: 	String,
	view_count		: 	String,
	bandwidth		: 	String
});

module.exports = imageSchema;