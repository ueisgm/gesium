var Schema = require('mongoose').Schema

var userSchema = new Schema ({
	firstName	:  	String,
	lastName	:   String,
	email		: 	String,
	password	: 	String,
	facebook	: 	{
		id		:   String,
		email	: 	String,
		name 	: 	String
	},
	last_login	: 	String,
	uploads 	: 	[],
	user_type	: 	Number
})

module.exports = userSchema;