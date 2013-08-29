Hello!

This is the main repo!

Application Structure: 

| package.json			# Top level files
| imgeus.js			# Start Imgeus! YEAH!

| configuration			# Configuration files go here
| --- application.json		# Application overall setup
| --- passport.js		# Passport setup
| --- routes.js			# Define the routes behavior here

| controllers			# Controllers - Classical textbook definition of MVC!
| --- images.js			# images
| --- users.js			# and the users

| models			# Models - simple and clean
| --- image.js			# image model
| --- user.js			# user mdel

| views				# Views - ejs
| --- display.ejs		# single iamge view
| --- footer.ejs		# dispaly the footer - nonexistent right now
| --- index.ejs			# home page of the application!
| --- login.ejs			# login screen - may go away in the future
| --- success.ejs		# success! Placeholder screen?
| --- profile.ejs		# User profile page

| routes			# Routes Handler - all API calls are handled accordingly here.
| --- main.js			# The main routing handler. May break it up if the complexity of the application increases

| public			# Front end magic stuff.
| --- assets			#
| --- boostrap			#
| --- images			#
| --- javascripts		#
| --- js			#
| --- stylesheets		#


For now, /tmp and /node_modules are ignored

Bye!
