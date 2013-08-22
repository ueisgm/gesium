/**
*	Model: image.js
*
*	Image model
*/


var Schema = require('mongoose').Schema;

var imageSchema = new Schema ({
	name	:	String,
	url		: 	String,
	size	:  	String		
	//TODO: will need more data
});

module.exports = imageSchema;