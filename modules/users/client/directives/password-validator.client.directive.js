(function () {
    'use strict';


    /**
     * Validation of the password requirements for the administrator users of the application
     *
     * */
    angular.module('users').directive('passwordValidator', passwordValidator);

    //Adding the dependencies
    passwordValidator.$inject = ['PasswordValidator'];

    function passwordValidator(PasswordValidator) {
        var directive = {
            require: 'ngModel',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$validators.requirements = function (password) {
                var status = true;
                if (password) {
                    var result = PasswordValidator.getResult(password);
                    var requirementsIdx = 0;

                    // Requirements Meter - visual indicator for users
                    var requirementsMeter = [{
                        color: 'danger',
                        progress: '20'
                    }, {
                        color: 'warning',
                        progress: '40'
                    }, {
                        color: 'info',
                        progress: '60'
                    }, {
                        color: 'primary',
                        progress: '80'
                    }, {
                        color: 'success',
                        progress: '100'
                    }];

                    if (result.errors.length < requirementsMeter.length) {
                        requirementsIdx = requirementsMeter.length - result.errors.length - 1;
                    }

                    scope.requirementsColor = requirementsMeter[requirementsIdx].color;
                    scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;

                    /* we validate if we have any errors */
                    if (result.errors.length) {
                        scope.getPopoverMsg = PasswordValidator.getPopoverMsg();
                        scope.passwordErrors = result.errors;
                        status = false;
                    } else {
                        scope.getPopoverMsg = '';
                        scope.passwordErrors = [];
                        status = true;
                    }
                }
                return status;
            };
        }
    }
}());
