//This is away of splitting out the routing from the rest of it.
//Basically, index.js is going to just call all of the functions in here.


//TODO the meat of the app is here, and is incomplete.
//TODO Live updating might work by always returning the entire contents of the board in every response from every call

var Wall = require('./models/wall');
var cfg = require('./config'); //load in our config.js


function makeId(size)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = function(app) {


	//API GETS--------------------------------------------------------

	//testing call for the API itself
	app.get('/api/test', function(req, res){
		console.log("Served request with testing route.");
		res.json({
			message: "It's ALIVE!"
		});
	});


	//Get a wall
	app.get('/api/walls/:wall_id', function(req, res) {
		Wall.findOne({'id' : req.params.wall_id }, function(error, results){

			if(error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}

			//if we made it through the error check, send out the results from mongo
			res.json(results);

			
		});
	});

	//Get a task from a wall
	//app.get('/api/', function(req, res) {
		//TODO
	//});

	//
	//app.get('', function(req, res) {
		//TODO
	//});

	//
	//app.get('', function(req, res) {
		//TODO
	//});

	//API POSTS-------------------------------------------------------

	//Create a new wall
	//TODO Passwords aren't a thing yet.
	app.post('/api/create', function(req, res){
		console.log("Hit the creation endpoint.");

		var newId = makeId(cfg.idSize);

		Wall.create({
			id: newId, //used for routing
			accessPassword: "pwd1", //TODO obviously these should be from the request body not hardcoded
			adminPassword: "pwd2", //TODO see above
			users: [], //no users yet
			tasks: [] //no tasks yet either
		}, function(error, results){
			console.log("Hit the creation function.");

			if(error){ //if we hit this, it won't continue after sending the 500
				console.log(error);
				res.status(500).send('Internal server error.');
			}

			console.log("Created new wall with id " + newId);
			res.json(results); //in theory this is the one we just made
		});
	});


	//API PUTS--------------------------------------------------------

	//TODO


	//API DELETES-----------------------------------------------------

	//TODO



	//Front-End Routes---------------------------------------------
	
	//The page to display a wall is domain.com/[wall name]
	app.get('/w/:wall_id', function(req, res){
		console.log("Served request with wall viewing Front-End route.");
		res.json({
			message: "Served request with wall viewing Front-End route for wall: " + req.params.wall_id
		});
	});

	//The very front of the site
	app.get('/', function(req, res) {
		//res.sendfile('./index.html'); //serve up the front of the site

		console.log("Served request with root route.");
		res.send('Hello from the index method');
	});

};