'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.panel');
  } catch (e) {
    module = angular.module('awelzijn.panel', []);
  }
  module.directive('aWelzijnPanel', ['$timeout',function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        title: '@',
        loading: '=',
        name:'=?',
        status:'=?'
      },
      controller: function($attrs) {
        this.autoSelect = $attrs.autoSelect;
      },
      link:function($scope,elem,$attrs){
        var formElement = elem.find('[tink-fieldset]');
        if($attrs.autoSelect !== undefined){
          $timeout(function(){
            var first = $(elem).find('a-welzijn-panel-field:first');
            formElement.isolateScope().setClassActive("mouseFocus",first);
            $timeout(function(){
              if(first.find(':input').length > 0){
                first.find(':input').focus().focusin();
              }else if(first.find('div[contentEditable]:first').length > 0){
                first.find('div[contentEditable]:first').focus().focusin();
              }
              
            },20);
          },15) 
        }
      },
      templateUrl: 'templates/panel.html'
    };
  }]);
})();
