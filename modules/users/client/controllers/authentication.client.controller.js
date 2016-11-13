(function () {
    'use strict';

    angular
        .module('users')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', 'AuthenticationService',
        'CurrentSessionService', 'PasswordValidator', 'CitiesService', 'ToastService'];

    function AuthenticationController($scope, $state, AuthenticationService, CurrentSessionService,
                                      PasswordValidator, CitiesService, ToastService) {
        var vm = this;

        //Public API
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
        vm.signup = signup;
        vm.signin = signin;
        vm.fetchCities = fetchCities;

        // If user is signed in then redirect back home
        if (CurrentSessionService.isUserLoggedIn()) {
            $state.go('home');
        }else{
            /* we try to obtain the cities */
        }

        /**
         * We fetch the list of the cities from the API
         * */
        function fetchCities(){
            CitiesService.getCities().then(function( cities ){
                //Setting the response to the view data
                vm.cities = cities;
            }).catch(function( errorResponse ){
                //Error obtaining the cities from the server
                ToastService.showToast('Error al obtener las ciudades');
            });
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
            AuthenticationService.signUp( vm.userInformation.firstName, vm.userInformation.lastName,
                vm.userInformation.cityId, vm.userInformation.telephone, vm.userInformation.password,
                vm.userInformation.email )
                .then(function( response ){
                    /* success doing the sing up the given user */
                    console.debug('Successful sign up of a user in the platform');

                    //Redirecting to the logged in states of the platform
                    $state.go('home');
                }).catch(function( errorResponse ){
                    /* error processing the sign up data in the server */
                    console.error( JSON.stringify( errorResponse.data ));

                    //Setting the error message of the form
                    vm.error = JSON.stringify( errorResponse.data );
                });
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
            AuthenticationService.signIn( vm.credentials.email, vm.credentials.password)
                .then(function( response ){
                    /* successful login of the user in the platform, we redirect to the main page */
                    $state.go($state.previous.state.name || 'home', $state.previous.params);
                }).catch(function( errorResponse  ){
                    /* error doing the login process */
                    console.error( JSON.stringify( errorResponse.data ));

                    //Setting the error message in the upper view
                    vm.error = JSON.stringify( errorResponse.data );
                });
        }

    }
}());
