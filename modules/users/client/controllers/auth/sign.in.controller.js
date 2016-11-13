(function () {
    'use strict';

    angular
        .module('users')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$scope', '$state', 'AuthenticationService',
        'CurrentSessionService', 'ToastService', '$rootScope'];

    function SignInController($scope, $state, AuthenticationService,
                              CurrentSessionService, ToastService, $rootScope) {
        var vm = this;

        //Public API
        vm.signin = signin;

        // If user is signed in then redirect back home
        if (CurrentSessionService.isUserLoggedIn()) {
            $state.go('home');
        }

        /**
         * Function in charge of the sign in of the users in the application
         * */
        function signin(isValid) {
            vm.error = null;

            /* we check the validity of the sign in input data */
            if (!isValid) {
                //We broadcast the error for the validators in the login form
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            /* doing the sign in request to the server */
            AuthenticationService.signIn(vm.credentials.email, vm.credentials.password)
                .then(function (response) {
                    // We just show a simple succesful login message
                    ToastService.showToast('Éxito al iniciar sesión');

                    /* we propagate the update */
                    $rootScope.$broadcast('UserSessionUpdate');

                    /* successful login of the user in the platform, we redirect to the main page */
                    $state.go($state.previous.state.name || 'home', $state.previous.params);
                }).catch(function (errorResponse) {
                    /* error doing the login process */

                    //Setting the error message in the upper view
                    vm.error = JSON.stringify(errorResponse.message);
                });
        }

    }
}());
