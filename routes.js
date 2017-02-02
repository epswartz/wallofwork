//This is away of splitting out the routing from the rest of it.
//Basically, index.js is going to just call all of the functions in here.


//TODO the meat of the app is here, and is incomplete.
//TODO Live updating might work by always returning the entire contents of the board in every response from every call

var Wall = require('./models/wall');

module.exports = function(app) {


	//API GETS--------------------------------------------------------


/* TODO uncomment all this when ready 
	//Get a wall
	app.get('/api/walls/:wall_id', function(req, res) {
		//TODO
	});

	//Get a task from a wall
	app.get('/api/', function(req, res) {
		//TODO
	});

	//
	app.get('', function(req, res) {
		//TODO
	});

	//
	app.get('', function(req, res) {
		//TODO
	});

	//API POSTS-------------------------------------------------------

	//TODO


	//API PUTS--------------------------------------------------------

	//TODO


	//API DELETES-----------------------------------------------------

	//TODO


*/
	//Front-End Routes---------------------------------------------
	
	//The page to display a wall is domain.com/[wall name]
	app.get('/:wall_id', function(req, res){
		res.sendfile('./wall.html');
	});

	//The very front of the site
	app.get('/', function(req, res) {
		res.sendfile('./index.html'); //serve up the front of the site
	});

};