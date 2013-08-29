var Schema = require('mongoose').Schema

var userSchema = new Schema ({
	firstName:  String,
	lastName:   String,
	email:      String,
	password: 	String,
	facebook:{
		id:       String,
		email:    String,
		name:     String
	},
})

module.exports = userSchema;