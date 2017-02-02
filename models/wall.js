//This is a schema used with a node package called mongoose
//You can google that, you're a big code monkey
//TLDR it gives you a MongoDB wrapper/driver and you do it by making "models"

var mongoose = require('mongoose');

//Schema for a user
var userSchema = new Schema({
	name: String, //The user's name, duh
	imageId: String //Used to get path to the image for the user
});

//Schema for a task
var taskSchema = new Schema({
	text: String, //text on the task note
	assignees: [userSchema], //it's possible this should be String IDs instead of objects. Not sure
	status: String //one of: "UNASSIGNED", "PROGRESS", "REVIEW", or "DONE"
});

//Schema for an entire wall
var wallSchema = new Schema({
	id: String, //used for routing
	accessPassword: String, //hashed version of the access password
	adminPassword: String, //hashed version of the admin password

	/*
	I'm not at all sure of the syntax I use here, I'm trying to use
	another object as a field. We'll see how many times I have to revisit this.

	In fact, let's count. So far: 2
	*/
	users: [userSchema], //all the users associated with the wall
	tasks: [taskSchema] //all the tasks on the wall
});


module.exports = mongoose.model('Wall', wallSchema);