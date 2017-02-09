var cfg = require('../config');

var wallOfWork = angular.module('wallOfWork', []);

function mainController($scope, $http){
	$scope.taskData = {}; //i think i am using this to store data about a task being edited

	//at the beginning, we just get the wall.
	var idx = window.location.pathname.slice(-1 * cfg.idSize); //get the last idSize characters in the URL, which should be the wall's id

	var authPass = ''; //TODO

	$http.get('/api/walls/' + idx) //get the wall
		.success(function(data){
			$scope.wall = data; //put the wall in scope for angular
		})
	
		.error(function(data){
			console.log("Failed to get wall " + idx);
		});


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




}