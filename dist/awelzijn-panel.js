'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.panel');
  } catch (e) {
    module = angular.module('awelzijn.panel', []);
  }
  module.directive('aWelzijnPanel', [function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        title: '@',
        loading: '='
      },
      templateUrl: 'templates/panel.html'
    };
  }]);
})();
;'use strict';
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
;angular.module('awelzijn.panel').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/panel.html',
    "<section class=panel> <header class=panel-heading> <i class=\"fa fa-th-large\"></i> <h1 class=panel-title>{{title}}\n" +
    "<a class=anchorPijl anchor-smooth-scroll=top></a> </h1> </header> <div class=panel-body a-welzijn-loading-overlay loading=loading> <div ng-transclude></div> </div> </section>"
  );


  $templateCache.put('templates/panelfield.html',
    "<div ng-class=colspanClass> <div ng-if=title ng-class=colspanClass class=labelTitle>{{title}}</div> <div ng-class=colspanClass> <div ng-show=editMode class=panel-field-input ng-transclude></div> <div ng-if=\"label != undefined && !hasClickCallback()\" ng-show=!editMode>{{label.trim() || \"-\"}}</div> <a href=\"\" ng-click=ngClick() ng-if=hasClickCallback() ng-show=!editMode>{{label.trim() || \"-\"}}</a> <a-welzijn-mail-to ng-if=email email-adres=email.trim() ng-show=!editMode></a-welzijn-mail-to> </div> </div>"
  );

}]);
