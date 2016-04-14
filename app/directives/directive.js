(function() {
	'use strict';

	angular
		.module('app')
		.directive('layout',layout);

	function layout(){
		return {
		    restrict : 'C',
		        link: function(scope, element) {
		            element.bind("click" , function(e){
		                 element.parent().find("body").removeClass("enabled");
		                 element.addClass("enabled");
		            });     
		        }
		    }
	}
})();
