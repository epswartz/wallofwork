//var cfg = require('../config');

angular.module('viewPage', ['ngMaterial'])


	.config(function($sceDelegateProvider) {
	  $sceDelegateProvider.resourceUrlWhitelist([
	    // Adding 'self' to the whitelist will allow requests from the current origin.
	    'self'
	  ]);
	})

	.config(function($mdThemingProvider) {
 		 $mdThemingProvider.theme('default')
    	.primaryPalette('blue', {
    		'default': '600'
    	})
    	.accentPalette('blue-grey', {
    		'default': '700'
    	})
    	.backgroundPalette('grey')
    	.warnPalette('red');
	})

	.config(function($mdIconProvider) {
    $mdIconProvider
       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
   })

	.controller('viewController', function viewController($scope, $http, $mdSidenav){
		
		console.log("Hello from the actual real life CONTROLLER! :)");

		$scope.taskData = {}; //i think i am using this to store data about a task being edited

		$scope.gridsterOpts = { //set options for angular-gridster
			margins: [20, 20],
			columns: 3,
			swapping: false,
			minColumns: 3,
			maxColumns: 3,
			outerMargin: false,
			pushing: true,
			floating: true,
			draggable: {
				enabled: true

			},
			resizable: {
				enabled: false,
				handles: ['n', 'e', 's', 'w', 'se', 'sw']
			}
		};

		$scope.customItemMap = { //maps the contents of task objects to angular-gridster
		    sizeX: 1,
		    sizeY: 1,
		    row: 0,
		    col: 'item.status',
		    minSizeY: '1',
		    maxSizeY: '1'
		};

		//at the beginning, we just get the wall.
		var idx = window.location.pathname.slice(-1 * 8); //get the last 8 characters in the URL, which should be the wall's id

		var authPass = ''; //TODO

		$http.get('/api/walls/' + idx) //get the wall
			.success(function(data){
				$scope.wall = data; //put the wall in scope for angular
				console.log("Successfully loaded wall " + idx);
			})
		
			.error(function(data){
				console.log("Failed to get wall " + idx);
		});

		$scope.testTasks = [{
			text: "U0", //text on the task note
			assignees: [], //it's possible this should be String IDs instead of objects. Not sure
			status: 0
		}, 
		{
			text: "U1", //text on the task note
			assignees: [], //it's possible this should be String IDs instead of objects. Not sure
			status: 0
		},{
			text: "P0", //text on the task note
			assignees: [], //it's possible this should be String IDs instead of objects. Not sure
			status: 1
		},{
			text: "R0", //text on the task note
			assignees: [], //it's possible this should be String IDs instead of objects. Not sure
			status: 2
		},{
			text: "D0", //text on the task note
			assignees: [], //it's possible this should be String IDs instead of objects. Not sure
			status: 3
		},];


		$scope.createTask = function(){
			//TODO
		};

		$scope.deleteTask = function(id){ //unsure of the id part, not sure how we are identifying these things yet
			//TODO
		};

		$scope.updateTask = function(id){
			//TODO
		};



		$scope.createUser = function(){
			//TODO
		};

		$scope.deleteUser = function(id){
			//TODO
		};

		$scope.updateUser = function(id){
			//TODO
		};



		$scope.changeWallName = function(){
			//TODO
		};

		/* the functions in here have to do with passwords and auth, which isn't a thing yet.

		$scope.changeAccessPassword = function(){
			//TODO
		};

		$scope.changeAdminPassword = function(){
			//TODO
		}

		*/




	});

