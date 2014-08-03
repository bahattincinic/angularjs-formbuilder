Angularjs Form Builder
-------------

Form builder with AngularJS

Installation
-------------

    bower install angularjs-formbuilder

add dependencies on the formBuilder AngularJS module:

    angular.module('myModule', ['formBuilder']);


Usage
-------------

    angular.module('mainApp', ['formBuilder']);
    angular.module('mainApp').controller('testController', function($scope){
        $scope.form = {
            title: 'Sample Form',
            attributes: [
                {
                    title: 'Full Name',
                    name: 'fistname',
                    type: 'textfield',
                    value: '',
                    required: true,
                },
                {
                    title: 'Password',
                    name: 'password',
                    type: 'password',
                    value: '',
                    required: true
                },
                {
                    title: 'email',
                    name: 'email',
                    type: 'email',
                    value: '',
                    required: true
                },
                {

                    title: 'Note',
                    name:'note',
                    type: 'textarea',
                    value: '',
                    required: true
                },
                {

                    title: 'Notification Email',
                    name:'notification',
                    type: 'radio',
                    fields: [{key: 'Yes', value: 1},{key: 'No', value: 2}],
                    value: '',
                    required: true,
                },
                {

                    title: 'Category',
                    name:'category',
                    type: 'checkbox',
                    fields: [{key: 'Man', value: 1},{key: 'Woman', value: 2}],
                    value: ''
                },
                {

                    title: 'Mailing',
                    name:'mailing',
                    type: 'select',
                    fields: [{key: 'Active', value: 1},{key: 'Passive', value: 2}],
                    value: '',
                    choose: '-- choose --',
                    required: true
                },
                {
                    type: 'submit',
                    value: 'Save'
                }
            ]
        }

        $scope.submit = function(){
            alert('submit');
        }
    });

    <ng-form data-form="form" data-submit="submit"></ng-form>

Available Types
-------------
## textfield:
- **path:** template/form/fields/textfield.html
- **parameters:** title, editable, name, value, required

## password:
- **path:** template/form/fields/password.html
- **parameters:** title, editable, name, value, required

## email:
- **path:** template/form/fields/email.html
- **parameters:** title, editable, name, value, required

## submit:
- **path:** template/form/fields/email.html
- **parameters:** editable, value

## textarea:
- **path:** template/form/fields/textarea.html
- **parameters:** title, editable, name, value, required

## radio:
- **path:** template/form/fields/radio.html
- **parameters:** title, editable, name, value, required, fields

## select:
- **path:** template/form/fields/select.html
- **parameters:** title, editable, name, value, required, fields

## checkbox:
- **path:** template/form/fields/checkbox.html
- **parameters:** title, editable, name, value, required, fields


Helper Types
--------------
- formHelperFactory::getObject(form) --> `formHelperFactory.getObject($scope.form)::object`
- formHelperFactory::setObject(form, attr) --> `formHelperFactory.setObject($scope.formform, {'username': 'bahattincinic'})`
- formHelperFactory::cleanObject(form) --> `formHelperFactory.cleanObject($scope.form)`
- formHelperFactory::filterFields(form, field_type) --> `formHelperFactory.filterFields($scope.form, 'textfield')`


Helper Example
-------------
    angular.module('myModule', ['formBuilder']);
    angular.module('myModule').controller('testController', function($scope, formHelperFactory, $resource, $routeParams){
        $scope.form = ......
        $scope.Blog =  $resource('/blog/:Id', {Id:'@id'});

        $scope.clear = function(){
            formHelperFactory.cleanObject($scope.form);
        }

        $scope.updateForm = function(){
            $scope.resource.get({Id: $routeParams.Id}, function(data){
                formHelperFactory.setObject($scope.form, data);
            });
        }

        $scope.create = function(){
            var instance = new $scope.resource(formHelperFactory.getObject($scope.form));
            instance.$save(function(){
                formHelperFactory.cleanObject($scope.form);
            });
        }
    });
