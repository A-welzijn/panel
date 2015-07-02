'use strict';
(function (module) {
	try {
		module = angular.module('awelzijn.panel');
	} catch (e) {
		module = angular.module('awelzijn.panel', []);
	}
	module.directive('aWelzijnPanelField', [function () {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				title: '@', 
				label: '@',
				html: '=',
				email: '@',
				colspan: '=',
				editMode: '=',
				filter: '@',
				ngClick: '&'
			},
			templateUrl: 'templates/panelfield.html',
			link: function (scope, element, attrs) {
				if (scope.colspan) {
					scope.colspanClass = ("col-lg-@ col-md-@").replace(/@/g, scope.colspan);
				} else {
					scope.colspanClass = ("col-lg-@ col-md-@").replace(/@/g, '6');
				}

				scope.hasClickCallback = function () {
					return angular.isDefined(attrs.ngClick);
				}
			}
		};
	}]);
})();
