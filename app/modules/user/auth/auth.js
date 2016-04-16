(function() {
	'use strict';

	angular
		.module('app')
		.controller('authController', authController)
		.controller('logoutController', logoutController);
		//.run(runAuth);
	authController.$inject = ['$scope', '$location', '$auth', 'toastr'];
	function authController($scope, $location, $auth, toastr) {

	    $scope.login = function() {
	      $auth.login($scope.user)
	        .then(function() {
	          toastr.success('You have successfully signed in!');
	          $location.path('app');
	        })
	        .catch(function(error) {
	          //console.log(error);
	          toastr.error(error.data.message, error.data.error);
	        });
    	}
    }

	logoutController.$inject = ['$location', '$rootScope', '$state', '$auth', 'toastr'];
	function logoutController($location, $rootScope, $state, $auth, toastr) {
	    if (!$auth.isAuthenticated()) { return; }
	    $auth.logout()
	      .then(function() {
	        toastr.info('You have been logged out');
	        $location.path('/login');
	      });
	}
})();