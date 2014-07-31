'use strict';

angular.module('formBuilder', []);


/**
    Form builder directive
    Sample: <ng-form data-form="form"></ng-form>
    Sample Data:
    $scope.form = {
        submit: function(){
            console.log('form::submit()');
        },
        attributes: [
            {
                title: 'First Name',
                type: 'textfield',
                value: '',
                required: true
            }
        ]
    }
*/
angular.module('formBuilder').directive('ngForm', function(){
    return {
        restrict: 'E',
        scope: { form: '=' },
        templateUrl: 'template/form/form.html'
    };
});


/**
    Field Builder
    Sample: <ng-field data-field="field"></ng-field>
*/
angular.module('formBuilder').directive('ngField', function(){
    return {
        restrict: 'E',
        scope: { field: '=' },
        template: '<div ng-include="\'template/form/fields/\' + field.type + \'.html\'"></div>'
    };
});


/**
 Form HTML
 Template Path: 'template/form/form.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
  $templateCache.put("template/form/form.html",
    "<form ng-submit=\"form.submit(this)\" role=\"form\">\n"+
    "<ng-field ng-repeat=\"field in form.attributes\" data-field=\"field\"></ng-field>"+
    "</form>");
}]);

/**
 Text Field HTML
 Template Path: 'template/form/fields/textfield.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/textfield.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input type=\"text\" ng-model=\"field.value\" id=\"{{field.title}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Textarea Field HTML
 Template Path: 'template/form/fields/textarea.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/textarea.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<textarea ng-model=\"field.value\" id=\"{{field.title}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">{{field.value}}</textarea>\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Radio Field HTML
 Template Path: 'template/form/fields/textarea.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/radio.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<div class=\"radio\" ng-repeat=\"item in field.fields\">\n"+
        "<label>\n"+
        "<input name=\"{{field.title}}\" ng-required=\"field.required\" ng-model=\"field.value\" value=\"{{item.value}}\" type=\"radio\"/>\n"+
        "{{item.key}} </label> </div>\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div></div>");
}]);

/**
 Password Field HTML
 Template Path: 'template/form/fields/password.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/password.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input type=\"password\" ng-model=\"field.value\" id=\"{{field.title}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Email Field HTML
 Template Path: 'template/form/fields/email.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/email.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input type=\"email\" ng-model=\"field.value\" id=\"{{field.title}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Submit Button HTML
 Template Path: 'template/form/fields/submit.html'
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/submit.html",
        "<input type=\"submit\" class=\"btn btn-primary\" ng-value=\"field.value\">\n");
}]);