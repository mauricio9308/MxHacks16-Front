(function () {
    'use strict';

    angular
        .module('users')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', '$state', 'AuthenticationService',
        'CurrentSessionService', 'PasswordValidator', '$rootScope'];

    function SignUpController($scope, $state, AuthenticationService, CurrentSessionService,
                                      PasswordValidator, $rootScope ) {
        var vm = this;

        //Public API
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
        vm.signup = signup;

        // If user is signed in then redirect back home
        if (CurrentSessionService.isUserLoggedIn()) {
            $state.go('home');
        }

        /**
         * Function in charge of the user sign up to the application
         * */
        function signup(isValid) {
            vm.error = null;

            /* we check the validity of the sign up form input data */
            if (!isValid) {
                //We broadcast the error validators from the sign up form
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            console.log('Sign up of the user... ' + JSON.stringify( vm.userInformation ));
            /* simple sign up of users in the platform */
            AuthenticationService.signUp( vm.userInformation.name, vm.userInformation.password,
                vm.userInformation.email )
                .then(function( response ){
                    /* success doing the sing up the given user */
                    console.debug('Successful sign up of a user in the platform');

                    /* we propagate the update */
                    $rootScope.$broadcast('UserSessionUpdate');

                    //Redirecting to the logged in states of the platform
                    $state.go('home');
                }).catch(function( errorResponse ){
                /* error processing the sign up data in the server */

                //Setting the error message of the form
                vm.error = errorResponse.message;
            });
        }


    }
}());
