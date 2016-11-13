(function () {
    'use strict';

    /**
     * Angular service in charge of the password logic validation
     * */
    angular
        .module('users.services')
        .factory('PasswordValidator', PasswordValidator);

    //Injecting the dependencies
    PasswordValidator.$inject = ['$window'];

    function PasswordValidator($window) {

        /*We obtain the password test library reference from the window object,
         the library doesn't have support for Angular JS at the moment */
        var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

        /* public API */
        return {
            getResult: getResult,
            getPopoverMsg: getPopoverMsg
        };


        /**
         * Obtains the result from the password test
         * */
        function getResult(password) {
            var result = owaspPasswordStrengthTest.test(password);
            return result;
        }

        /**
         * Obtains the popover message
         *
         * TODO why is this called?
         *
         * */
        function getPopoverMsg() {
            var popoverMsg = 'Please enter a passphrase or password with 10 or more characters, numbers, lowercase, uppercase, and special characters.';

            return popoverMsg;
        }
    }

}());
