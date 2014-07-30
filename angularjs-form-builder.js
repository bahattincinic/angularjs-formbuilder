'use strict';

angular.module('formBuilder', []);

angular.module('formBuilder').directive('ngForm', function(){
    return {
        restrict: 'E',
        scope: {
            form: '=form'
        },
        templateUrl: 'template/form/form.html'
    };
});

angular.module('formBuilder').directive('ngField', function(){
    return {
        restrict: 'E',
        scope: {
            field: '=field'
        },
        link: function(scope, element, attrs) {
           scope.getContentUrl = function() {
                return 'template/form/fields/' + attrs.type + '.html';
           }
       },
       template: '<div ng-include="getContentUrl()"></div>'
    };
});

angular.module('formBuilder').run(["$templateCache", function($templateCache) {
  $templateCache.put("template/form/form.html",
    "<form ng-submit=\"form.submit\">\n"+
    "<ng-field ng-repeat=\"field in form.attributes\" field=\"field\"></ng-field>"+
    "</form>");
}]);

angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/texfield.html",
        "<div class=\"field row\">\n" +
        "<div class=\"span2\" ng-bind=\"field.title\"></div>\n" +
        "<div class=\"span4\">\n" +
        "<input type=\"text\" ng-model=\"field.value\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);