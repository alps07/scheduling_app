var myAppModule = angular.module('myApp', ['ngRoute']);

myAppModule.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl:'partials/login.html'
		})
		.when('/docApp',{
			templateUrl: 'partials/docApp.html'
		})
		.when('/newAppoint',{
			templateUrl: 'partials/newAppoint.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})


myAppModule.factory('DashboardFactory', function($http){	
	var currUser;
	var validationErr;
	var docApps = [];
	var factory = {};

	factory.getAppnt = function(callback){
		console.log('factory');
		$http.get('/docApps').success(function(output){
			docApps = output;
			console.log('getAppnt');
			console.log(docApps +"::::");
			callback(docApps);
		})
	}

	factory.addAppnt = function(newAppn, callback){
		console.log("adding")
		console.log(newAppn);
		$http.post('/docApps', newAppn).success(function(result){
			if (result.resdata === 'success') {
				$http.get('/docApps').success(function(output){
					docApps = output;
					callback(null,docApps);
				})
			}else {

				//console.log(result.error);
				validationErr = result.error.errors;
				console.log("validation");console.log(validationErr);				
				callback(validationErr);
			}
		})
	}
	factory.getValidationErr = function(){
		console.log("get err")
		console.log(validationErr);
		return validationErr;
	}

	factory.getCurrUser = function(newUser){
		currUser = newUser.name;
		console.log(currUser);
	}

	factory.getUserName = function(){
		return currUser;
	}

	factory.setErr = function(err){
		console.log("setting err");
		validationErr = err;
		console.log("validationErr err");
		console.log(validationErr);
	}
	return factory;
})


myAppModule.controller('DocAppnController', function($scope,DashboardFactory){
	
	$scope.docApps =[];
	$scope.userName ="";
	$scope.errorMsg = [];
	$scope.validation;
	$scope.userName = DashboardFactory.getUserName();	

	console.log("controller");
	$scope.docApps = DashboardFactory.getAppnt(function(data){
		//console.log("reading");
		$scope.validationErr = DashboardFactory.getValidationErr();
		console.log(data);
		$scope.docApps = data;
	})	

	

})
//topic board controller
myAppModule.controller('NewAppController', function($scope,DashboardFactory){
	$scope.newAppoint;
	$scope.errorMsg;
	console.log("contr adding 1")
	$scope.addAppn = function(newAppn){
		var name = DashboardFactory.getUserName();
		console.log(name);
		newAppn.p_name = name;
		console.log("contr adding 2")
		console.log(newAppn);
		DashboardFactory.addAppnt(newAppn, function(err,result){
			if(err){
				console.log("err1");
				$scope.errorMsg = err;
				console.log("$scope.errorMsg");
				console.log($scope.errorMsg);
				DashboardFactory.setErr($scope.errorMsg);
			}else{
				$scope.newAppoint = result;
			}
		})
	}
	console.log($scope.errorMsg);

	
})

//login page controller
myAppModule.controller('LoginController', function($scope,DashboardFactory){
	
	$scope.userName="";
	console.log("controller");
	$scope.gotoDash = function(newUser){
		console.log(newUser.name);
		DashboardFactory.getCurrUser(newUser);
	}
})
