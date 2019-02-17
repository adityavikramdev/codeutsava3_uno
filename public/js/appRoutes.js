var routes=angular.module("appRoutes",[]);
routes.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	$urlRouterProvider.when('/','/login');
	$stateProvider
	.state("login",{
		url:"/login",
		templateUrl:"views/login.html",
		controller:"loginController",
		authenticate:"false"
	})
	.state("register",{
		url:"/register",
		templateUrl:"views/register.html",
		controller:"registerController",
		authenticate:"false"
	})
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
	
})