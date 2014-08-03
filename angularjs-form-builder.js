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
        scope: { form: '=', submit:'=' },
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
    Checkbox Changed Values
    Sample: <input type="checkbox" checkbox-group />
*/
angular.module('formBuilder').directive("checkboxGroup", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            if(scope.field.value == '' || scope.field.value == undefined || scope.field.value == null){
                scope.field.value = [];
            }
            // Determine initial checked boxes
            if (scope.field.value.indexOf(scope.item.value) !== -1) {
                elem[0].checked = true;
            }

            // clean object
            scope.$watch('field.value', function(nv){
                var index = scope.field.value.indexOf(scope.item.value);
                if (index !== -1) {
                    elem[0].checked = true;
                }else{
                    elem[0].checked = false;
                }
            });

            // Update array on click
            elem.bind('click', function () {
                var index = scope.field.value.indexOf(scope.item.value);
                // Add if checked
                if (elem[0].checked) {
                    if (index === -1) scope.field.value.push(scope.item.value);
                }
                // Remove if unchecked
                else {
                    if (index !== -1) scope.field.value.splice(index, 1);
                }
                // Sort and update DOM display
                scope.$apply(scope.field.value.sort(function (a, b) {
                    return a - b
                }));
            });
        }
    }
});

/**
 Form Helpers
*/
angular.module('formBuilder').factory('formHelperFactory', function(){
    var Helper = {};

    /* get form paramethers */
    Helper.getObject = function(form){
        var fields = {};
        angular.forEach(form.attributes, function(key) {
            if(key.type != 'submit'){
                this[key.name] = key.value;
            }
        }, fields);
        return fields;
    };

    /* fill form */
    Helper.setObject = function(form, attr){
        angular.forEach(form.attributes, function(key) {
            key.value = attr[key.name];
        });
        return form;
    };

    /* Clean */
    Helper.cleanObject = function(form){
        angular.forEach(form.attributes, function(key){
            if(key.type != 'submit'){
                key.value = angular.isArray(key.value) ? [] : '';
            }
        });
        return form;
    }

    /**
    Filter Fields
    */
    Helper.filterFields = function(form, field_type){
        var fields = [];
        angular.forEach(form.attributes, function(key) {
            if(key.type == field_type){
                fields.push(key);
            }
        });
        return fields;
    }

    return Helper;
});

/**
 Form HTML
 Template Path: 'template/form/form.html'
 attributes:
    --form
    --submit
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
  $templateCache.put("template/form/form.html",
    "<form ng-submit=\"submit()\" role=\"form\">\n"+
    "<h2 ng-show=\"form.title\" ng-bind=\"form.title\"></h2>\n"+
    "<ng-field ng-repeat=\"field in form.attributes\" data-field=\"field\"></ng-field>"+
    "</form>");
}]);

/**
 Text Field HTML
 Template Path: 'template/form/fields/textfield.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/textfield.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input ng-readonly=\"field.editable\" name=\"{{field.name}}\" type=\"text\" ng-model=\"field.value\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Textarea Field HTML
 Template Path: 'template/form/fields/textarea.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/textarea.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<textarea ng-readonly=\"field.editable\" name=\"{{field.name}}\" ng-model=\"field.value\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">{{field.value}}</textarea>\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Radio Field HTML
 Template Path: 'template/form/fields/radio.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --fields
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/radio.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<div class=\"radio\" ng-repeat=\"item in field.fields\">\n"+
        "<label>\n"+
        "<input ng-disabled=\"{{field.editable}}\" name=\"{{field.name}}\" ng-required=\"field.required\" ng-model=\"field.value\" value=\"{{item.value}}\" type=\"radio\"/>\n"+
        "{{item.key}} </label> </div>\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div></div>");
}]);

/**
 Select Field HTML
 Template Path: 'template/form/fields/select.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --fields
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/select.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<select name=\"{{field.name}}\" ng-disabled=\"field.editable\"  ng-required=\"field.required\" ng-model=\"field.value\" ng-options=\"item.value as item.key for item in field.fields\">\n"+
        "<option value=\"\" ng-bind=\"field.choose\"></option>\n"+
        "</select></div>\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div>");
}]);

/**
 Checkbox Field HTML
 Template Path: 'template/form/fields/checkbox.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --fields
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/checkbox.html",
        "<div class=\"form-group\" ng-init=\"field._initial=field.value.slice()\" >\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<div class=\"checkbox\" ng-repeat=\"item in field.fields\">\n"+
        "<label>\n"+
        "<input ng-disabled=\"field.editable\" name=\"{{field.name}}[]\" checkbox-group type=\"checkbox\"/>\n"+
        "{{item.key}} </label> </div>\n" +
        "</div></div>");
}]);


/**
 Password Field HTML
 Template Path: 'template/form/fields/password.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/password.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input ng-readonly=\"field.editable\" type=\"password\" ng-model=\"field.value\" name=\"{{field.name}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Email Field HTML
 Template Path: 'template/form/fields/email.html'
 attributes:
    --title (optional)
    --editable (optional)[true|false]
    --name
    --value
    --required (optional)[true|false]
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/email.html",
        "<div class=\"form-group\">\n" +
        "<label for=\"{{field.title}}\" ng-bind=\"field.title\"></label>\n" +
        "<div class=\"span4\">\n" +
        "<input ng-readonly=\"field.editable\" type=\"email\" ng-model=\"field.value\" name=\"{{field.name}}\" class=\"form-control\" ng-value=\"field.value\" ng-required=\"field.required\">\n" +
        "<span ng-show=\"field.required && !field.value\">* required</span>\n" +
        "</div> </div>");
}]);

/**
 Submit Button HTML
 Template Path: 'template/form/fields/submit.html'
 attributes:
    --editable (optional)[true|false]
    --value
*/
angular.module('formBuilder').run(["$templateCache", function($templateCache) {
    $templateCache.put("template/form/fields/submit.html",
        "<input type=\"submit\" ng-disabled=\"field.editable\" class=\"btn btn-primary\" ng-value=\"field.value\">\n");
}]);