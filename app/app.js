(function() {
	'use strict';

	angular
		.module('app', 
			[
				'ngResource', 
				'ngMessages', 
				'ngAnimate', 
				'toastr', 
				'ui.router',
				'satellizer'
			])
  		.config(appConfig);

  	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider'];

  	function appConfig($stateProvider, $urlRouterProvider, $authProvider) {

		$stateProvider
			.state('login', {
		        url: '/login',
		        templateUrl: 'app/modules/user/auth/login.html',
		        controller: 'authController',
		        resolve: {
		          skipIfLoggedIn: skipIfLoggedIn
		        }
		    })
		    .state('logout', {
		        url: '/logout',
		        template: null,
		        controller: 'logoutController'
		    })
		    .state('app', {
		        url: '/app',
		        controller: 'homeController',
		        abstract: true,
		        templateUrl: 'app/modules/core/core.html', //side nav and top nav
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		     .state('app.createUser', {
		        url: '/user/create',
		        templateUrl: 'app/modules/user/new/create.html',
		        controller: 'createUserController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		    .state('app.user', {
		        url: '/user',
		        templateUrl: 'app/modules/user/user.html',
		        controller: 'accountController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		    .state('app.dashboard', {
		        url: '/dashboard',
		        templateUrl: 'app/modules/dashboard/dashboard.html',
		        controller: 'dashboardController',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    });

		$authProvider.loginUrl = '/api/authenticate';

	    $urlRouterProvider.otherwise(function($injector) {
	      var $state = $injector.get('$state');
	      $state.go('app.dashboard');
	    });

	    function skipIfLoggedIn($q, $auth) {
	      var deferred = $q.defer();
	      if ($auth.isAuthenticated()) {
	        deferred.reject();
	      } else {
	        deferred.resolve();
	      }
	      return deferred.promise;
	    }

	    function loginRequired($q, $location, $auth) {
	      var deferred = $q.defer();
	      if ($auth.isAuthenticated()) {
	        deferred.resolve();
	      } else {
	        $location.path('/login');
	      }
	      return deferred.promise;
	    }
	}

})();