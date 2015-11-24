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
	module.directive('aWelzijnPanelField', ['$compile','$timeout','safeApply',function ($compile,$timeout,safeApply) {
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
			link: function ($scope, element, attrs,transclude) {
				//$scope.editMode = false;
				var originalElement = $(element).clone();
				if ($scope.colspan) {
					$scope.colspanClass = ("col-lg-@ col-md-@").replace(/@/g, $scope.colspan);
				} else {
					$scope.colspanClass = ("col-lg-@ col-md-@").replace(/@/g, '6');
				}

				if(!$scope.filter){
					$scope.filter = '.trim()'
				}


				var formElement = element.closest('[tink-fieldset]');
				var edit = findEditableFields(element.find('[ng-transclude]'));

				

				
				$scope.$watch(function(){return formElement.isolateScope().tinkFormStatus},function(value,old){
					if(old === 'mouseFocus'){
						setFakeInput(element);
					}else if(value === 'mouseFocus'){
						setRealInput();					
					}
				});
				setFakeInput(element);
				function addToObject(value,type,object){

					if(type==='datepickerRange1'){

						var firstModel = $(value).attr('first-date') || $(value).attr('data-first-date');
						var lastModel = $(value).attr('last-date') || $(value).attr('data-last-date');
						
						var model = '<div class="datepicker-input-fields row no-gutter"> <div class=col-sm-6> <div class="faux-input" contenteditable="true">'+$scope.label+'</div>' +
						'</div> <div class=col-sm-6> <div class="faux-input" contenteditable="true">{{label}}</div> </div>';
						var fake = $(model);

					}else{
						var ngmodel = $(value).attr('ng-model') || $(value).attr('data-ng-model');
						console.log($scope.label)
						var fake = $('<div contenteditable="true" class="faux-input">{{label}}</div>');
						$(fake).attr('ng-model',ngmodel);
					}
					
					var scope = $(value).scope();
					
					
					if(object[type] && object[type] instanceof Array){
						object[type].push({real:value,fake:fake,scope:scope});
					}else{
						object[type] = [{real:value,fake:fake,scope:scope}];
					}
					return object;
				}

				function findEditableFields(element){
					var editableFields = {
						input:'input',
						select:'select',
						datepicker:'data-tink-datepicker',
						timepicker:'tink-timepicker',
						national:'tink-national-number',
						datepickerRange:'tink-datepicker-range',
						tinkIdentity:'tink-identity-number',
						textarea:'textarea'
					}
					var calculated = {};
					for(var i=0;i<Object.keys(editableFields).length;i++){
						var currentKey = Object.keys(editableFields)[i],
							currentValue = editableFields[currentKey];
							var childs = $(element).children();
							for(var j=0;j<childs.length;j++){
								var child = $(childs[j]);
								if(child.is(currentValue)){
									calculated = addToObject(child,currentKey,calculated)
								}else {
									/*var elemFound = child.find(currentValue);
									elemFound.each(function(index){
										calculated = addToObject(elemFound[index],currentKey,calculated)
									})*/
								}
							}
					}
					return calculated;
				}

				function setRealInput(){
					for(var i=0;i<Object.keys(edit).length;i++){
						var currentKey = Object.keys(edit)[i],
							currentValue = edit[currentKey];
						for(var j = 0;j<currentValue.length;j++){
							var fake = currentValue[j].fake,
							real = currentValue[j].real,
							scopeField = currentValue[j].scope;

							$(fake).replaceWith(real);
							formElement.isolateScope().addEvents($(real));

					        
							$compile(real)(scopeField);
						}
					}

				}

				var openSelect = function(selector,type){
				     var element = $(selector)[0], worked = false;
				    if (document.createEvent) { // all browsers
				        var e = document.createEvent("MouseEvents");
				        e.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				        worked = element.dispatchEvent(e);
				    } else if (element.fireEvent) { // ie
				        worked = element.fireEvent("onmousedown");
				    }
				}

				function isDisabled(element){
					element = $(element);
					 return element.attr('disabled') || element.attr('is-disabled') || element.attr('data-is-disabled') || element.attr('data-disabled');
				}
				
				function setFakeInput(element){
					for(var i=0;i<Object.keys(edit).length;i++){
						var currentKey = Object.keys(edit)[i],
							currentValue = edit[currentKey];
						for(var j = 0;j<currentValue.length;j++){
							if(currentValue[j]){
								
								var fake = currentValue[j].fake,
									real = currentValue[j].real,
									scopeField = currentValue[j].scope;
								formElement.isolateScope().removeEvents($(real));
								$(real).replaceWith(fake)
								$compile(fake)($scope);
								fake.bind('mousedown',function(){
									//if(!isDisabled(fake)){
										$timeout(function(){
											$(real).focusin();
											$(real).focus();
											openSelect($(real),'focus');
											openSelect($(real),'mousedown');
										},0)
										formElement.isolateScope().addEvents($(fake));
								//	}									
								})
								
							}
						}
					}

				}

				$scope.hasClickCallback = function () {
					return angular.isDefined(attrs.ngClick);
				}
			}
		};
	}]).filter('filterfilter', function($filter) {
		  return function(input,filter,d) {
		  	return $filter('filter')(input, filter,d);
		  };
		});
})();
;angular.module('awelzijn.panel').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/panel.html',
    "<section class=card> <header class=card-heading> <i class=\"fa fa-th-large\"></i> <h1 class=card-title>{{title}}\n" +
    "<a class=anchorPijl anchor-smooth-scroll=top></a> </h1> </header> <div class=card-body a-welzijn-loading-overlay loading=loading> <form class=\"fieldset-editable form-horizontal\" tink-form-editable=true tink-fieldset> <div ng-show=!loading ng-transclude></div> </form> </div> </section>"
  );


  $templateCache.put('templates/panelfield.html',
    "<div ng-class=colspanClass> <div ng-if=title ng-class=colspanClass class=labelTitle>{{title}}</div> <div ng-class=colspanClass> <div ng-show=editMode class=panel-field-input ng-transclude> <div contenteditable=true class=faux-input>{{label}}</div> </div> <div ng-show=!editMode contenteditable=false disabled class=faux-input>{{label || '-'}}</div> </div> </div>"
  );

}]);
