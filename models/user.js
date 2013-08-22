var Schema = require('mongoose').Schema

var userSchema = new Schema ({
	name	:	String,
	email	:	String
})

module.exports = userSchema;