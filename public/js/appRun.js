angular.module("appRun",[]).run(function($rootScope,$state,$http){
	$rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
		$rootScope.$state=$state;
		$http({
			url:"/getsession",
			method:"GET"
		}).then(function(response){
			response=response.data;
			console.log(response);
			event.preventDefault();
			if(response.success){
				var auth=['home','viewjobs'];
				// console.log(response.result)
				 $rootScope.currentUser = response.result;
				 console.log($rootScope.currentUser);
				var num=auth.indexOf(toState.name);
				if(num!=-1){
					$state.go(toState);
				   }
				else{
					$state.go("home");
					}
			}else{
				// console.log(response);
				var auth=['login','register'];
				// console.log(toState.name);
				$rootScope.currentUser = null;
				var num=auth.indexOf(toState.name);
				if(num!=-1)
					$state.go(toState);
				else
					$state.go("login");

			}
		})
		$rootScope.logout=function(){
		$http({
			url:"/logout",
			method:"GET"

		}).then(function(response){
			if(response.data.success){
				console.log("loggedout");
				$state.go("login");
			}else{
				console.log("errorr");
			}
		})
	}
	})
})