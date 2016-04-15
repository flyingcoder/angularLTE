(function() {
	'use strict';

	angular
		.module('app')
		.controller('navController', navController)

	navController.$inject = ['$scope', '$auth'];
	function navController($scope, $auth) {

	    $scope.isAuthenticated = function() {
      			return $auth.isAuthenticated();
      	}

      	$scope.user = {
      		name: "Alvin",
      		lastname: "Pacot",
      		dateJoined: "Jan. 2016"
      	}
    }
})();