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
		      .state('app', {
		        url: '/app',
		        controller: 'homeController',
		        templateUrl: 'app/modules/core/core.html', //side nav and top nav
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })
		      .state('login', {
		        url: '/login',
		        templateUrl: 'app/modules/user/auth/login.html',
		        controller: 'authController',
		        resolve: {
		          skipIfLoggedIn: skipIfLoggedIn
		        }
		    })
		      /*.state('signup', {
		        url: '/signup',
		        templateUrl: 'partials/signup.html',
		        controller: '',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    })*/
		      .state('logout', {
		        url: '/logout',
		        template: null,
		        controller: 'logoutController'
		    })
		      .state('app.user', {
		        url: '/user',
		        templateUrl: 'app/modules/user/user.html',
		        controller: 'ProfileCtrl',
		        resolve: {
		          loginRequired: loginRequired
		        }
		    });

		$authProvider.loginUrl = '/api/authenticate';

	    $urlRouterProvider.otherwise('/app');

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