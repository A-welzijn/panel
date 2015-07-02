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
