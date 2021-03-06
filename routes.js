//This is away of splitting out the routing from the rest of it.
//Basically, index.js is going to just call all of the functions in here.


//TODO The meat of the app is here, and is incomplete.
//TODO Live updating might work by always returning the entire contents of the board in every response from every call
//TODO Every single one of these functions, with the exception of wall creation, should go through BasicAuth before doing anything.
//TODO A lot of these reutrn "Internal server error" when they can't find the wall. That shouldn't happen, it should give some other "no such wall". You can probably find instances of this with ctrl+f for " || error" and " || error1", etc.

var Wall = require('./models/wall');
var cfg = require('./config'); //load in our config.js


function makeId(size)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    //TODO this needs a check to make sure we don't already have the ID, or shit's gonna get hairy.

    return text;
}

module.exports = function(app) {


	//API GETS--------------------------------------------------------

	//testing call for the API itself
	app.get('/api/test', function(req, res){
		console.log("Served request with testing route.");
		res.send("It's alive!");
	});

	//testing call for the API itself that clears the DB
	//TODO Please dear LORD remember to delete this at the end
	app.get('/api/deleteAll', function(req, res){
		
		//remove everything. "just fuck me up, fam"
		Wall.remove({}, function(error, results){
			if(error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}
		});
		res.send("Everything in DB deleted.");
	});

	//testing call for the API itself that returns all walls
	//TODO Please dear LORD remember to delete this at the end
	app.get('/api/getAll', function(req, res){
		
		//get everything.
		Wall.find({}, function(error, results){
			if(error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}else{
				res.json(results);
			}
		});
		
	});



	//Get a wall
	app.get('/api/walls/:wall_id', function(req, res) {
		Wall.findOne({'id' : req.params.wall_id }, function(error, results){

			if(error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}else{

				//if we made it through the error check, send out the results from mongo
				res.json(results);
			}

			
		});
	});

	//API POSTS-------------------------------------------------------

	//Create a new wall
	//TODO Passwords aren't a thing yet.
	app.post('/api/walls', function(req, res){
		console.log("Hit the creation endpoint.");

		var newId = makeId(cfg.idSize);

		Wall.create({
			id: newId, //used for routing
			name: "Garrett's Wall",
			accessPassword: "pwd1", //TODO obviously these should be from the request body not hardcoded
			adminPassword: "pwd2", //TODO see above
			users: [], //no users yet
			tasks: [] //no tasks yet either
		}, function(error, results){

			if(error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}else{

				console.log("Created new wall with id " + newId);
				res.json(results); //in theory this is the one we just made
			}
		});
	});


	//Add a user to a wall
	app.post('/api/walls/:wall_id/users', function(req, res){
		console.log("attempting to add a user.");
		/*
		TODO I don't actually know that this can't be exploited, but I am assuming
		for now that it will throw an error if something other than getting passed the data happens.
		It's notable that I am NOT sure of the behavior when something has an overlap, or is a identical, etc.
		*/
		Wall.findOne({'id' : req.params.wall_id }, function(error, results){



			if(!results || error){ //if we hit this, it won't continue after sending the 500
				if(error){console.log(error);}
				res.status(500).send('Internal server error.');
			}else{

				//results is the wall we are on, and req.body is the request body with the information in there

				var idx = results.users.push({
					name: "Garrett",
					imageId: "12345" 
				}) - 1; //this minus one here results in us getting back the index of the one we just pushed

				results.save(function(error1){
	               	if(error1){
	               		console.log(error1);
						res.status(500).send('Internal server error.');
					}else{
						res.json(results.users[idx]); //return the new user we just made? we might need to return the whole wall.
	            	}
	            });

			}
			
		});
	});

	
	//Add a task to a wall
	app.post('/api/walls/:wall_id/tasks', function(req, res){

		/*
		TODO I don't actually know that this can't be exploited, but I am assuming
		for now that it will throw an error if something other than getting passed the data happens.
		It's notable that I am NOT sure of the behavior when something has an overlap, or is a identical, etc.
		*/
		Wall.findOne({'id' : req.params.wall_id }, function(error, results){

			if(!results || error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}else{

				//results is the wall we are on, and req.body is the request body with the information in there

				var idx = results.tasks.push({
					text: "Garrett's task",
					assignees: [],
					status: "UNNASSIGNED"
				}) - 1; //this minus one here results in us getting back the index of the one we just pushed

				results.save(function(error1){
	               	if(error1){
	               		console.log(error1);
						res.status(500).send('Internal server error.');
					}else{
						res.json(results.tasks[idx]); //return the new user we just made? we might need to return the whole wall.
	            	}
	            });

			}
			
		});
	});
	

	//API PUTS--------------------------------------------------------

	//Update a task on a wall.
	app.put('/api/tasks/:task_id', function(req, res){
		Task.findById(req.params.task_id, function(error, results){
			if(!results || error){
				console.log(error);
				res.status(500).send('Internal server error.');
			}else{
				results.text = 'Updated Task';
				results.assignees = []; //still blank i guess
				results.status = "PROGRESS";
				results.save(function(error1, updated){

					if(!updated || error1){
						console.log(error);
						res.status(500).send('Internal server error.');
					}else{
						res.json(updated);
					}
				});
			}
		});
	});

	//Update a user on a wall.
	app.put('/api/users/:user_id', function(req, res){
		//TODO
	});


	//Update a wall.
	//I'm not sure if this is just supposed to be used for settings, or what.
	//Edits that DONT have to do with the name or passwords of the wall just go through the update task/ update user endpoints.
	app.put('/api/walls/:wall_id', function(req, res){
		
	});


	//API DELETES-----------------------------------------------------


	//Delete a task from a wall
	app.delete('/api/walls/:wall_id/tasks/:task_id', function(req, res){
		//TODO
	});

	//Delete a user from a wall
	app.delete('/api/walls/:wall_id/users/:user_id', function(req, res){
		//TODO
	});

	//Delete a task from a wall
	app.delete('/api/walls/:wall_id', function(req, res){
		//TODO
	});





	//Front-End Routes---------------------------------------------
	
	//The page to display a wall is at /w/[wall name]
	app.get('/w/:wall_id', function(req, res){
		console.log("Served request with wall viewing Front-End route.");
		res.sendFile(__dirname + '/pages/view/view.html');
	});

	//The very front of the site
	app.get('/', function(req, res) {
		//res.sendfile('./index.html'); //serve up the front of the site

		console.log("Served request with root route.");
		res.send('Hello from the index method');
	});

};