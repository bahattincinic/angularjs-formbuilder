'use strict';

angular.module('formBuilder', []);

angular.module('formBuilder').directive('ngForm', function(){
    return {
        restrict: 'E',
        scope: { form: '=' },
        templateUrl: 'template/form/form.html',
    };
});

angular.module('formBuilder').directive('ngField', function(){
    return {
        restrict: 'E',
        scope: { field: '=' },
        template: '<div ng-include="\'template/form/fields/\' + field.type + \'.html\'"></div>'
    };
});

angular.module('formBuilder').run(["$templateCache", function($templateCache) {
  $templateCache.put("template/form/form.html",
    "<form ng-submit=\"form.submit()\" role=\"form\">\n"+
    "<ng-field ng-repeat=\"field in form.attributes\" data-field=\"field\"></ng-field>"+
    "</form>");
}]);

angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/textfield.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input type=\"text\" ng-model=\"field.value\" id=\"{{field.title}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/email.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input type=\"email\" ng-model=\"field.value\" id=\"{{field.title}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/submit.html",
        "<input type=\"submit\" class=\"btn btn-primary\" ng-value=\"field.value\">\n");
}]);