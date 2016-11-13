(function () {
    'use strict';

    angular
        .module('users.services')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$q', 'ApiValues',
        'TokenHandlerService', 'CurrentSessionService', '$localStorage'];

    /**
     * Service in charge of the handling of the authentication request for the API
     * */
    function AuthenticationService($http, $q, ApiValues, TokenHandlerService,
                                   CurrentSessionService, $localStorage) {

        //public API
        return {
            signIn: signIn,
            signUp: signUp,
            logout : logout
        };

        /**
         * Operates the sign in process of a user to the platform
         * */
        function signIn(email, password) {
            //Creating the defer object
            var signInDefer = $q.defer();

            /* checking the if the required data was provided */
            if (!email || !password) {
                // Rejecting because not enough data was provided
                signInDefer.reject({
                    message: 'You should provide the user and password'
                });
            }

            /* required login data */
            var loginPayload = {
                email : email,
                password : password
            };

            /* doing the API request */
            $http.post( ApiValues.buildAbsolutePath( 'auth/signin' ), loginPayload)
                .then(function( response ){
                    /* successful login response */
                    var responseData = response.data;

                    // Printing the response
                    console.log( JSON.stringify( response.data ));

                    /* updating the token references */
                    TokenHandlerService.setCredentials(
                        responseData.applicationToken
                    );

                    //Getting the reference of the user
                    var signInUser = responseData.userInfo;

                    /* saving the current session information */
                    CurrentSessionService.setUserInformation(
                        signInUser.name,
                        signInUser.email,
                        signInUser.type
                    );

                    // Returning the success
                    signInDefer.resolve( responseData );
                }).catch(function( response ){
                    /* error while logging in */
                    console.debug( response.data );

                    signInDefer.reject( response.data );
                });

            return signInDefer.promise;
        }


        /**
         * Log outs the current user
         * */
        function logout(){
            /* deletes any local storage variables */
            $localStorage.$reset();
        }


        /**
         * Operates the sign up process petition of a given user
         * */
        function signUp( name, password, email ) {
            //Creating the sign up defer object
            var signUpDefer = $q.defer();

            /* validating the pass of the data */
            if( !name || !password || !email ){
                //Not all the parameters were passed
                signUpDefer.reject({
                   message: 'You need to provide all the sign up parameters'
                });
            }

            //Building the sign up data
            var signUpData = {
                name: name,
                password: password,
                email: email
            };

            /* doing the sign up request */
            $http.post( ApiValues.buildAbsolutePath( 'auth/signup '), signUpData)
                .then(function( response ){
                    /* successful sign up */
                    var responseData = response.data;

                    //Setting the login credentials
                    TokenHandlerService.setCredentials(
                        responseData.applicationToken
                    );

                    //Getting the reference of the user
                    var signInUser = responseData.userInfo;

                    /* saving the current session information */
                    CurrentSessionService.setUserInformation(
                        signInUser.name,
                        signInUser.email,
                        signInUser.type
                    );

                    //Resolving the sign up request as successful
                    signUpDefer.resolve( responseData );
                }).catch(function( response ){
                    /* error doing the sign up */
                    console.debug( JSON.stringify( response.data ));

                    //Resolving the sign up error
                    signUpDefer.reject( response.data );
                });

            return signUpDefer.promise;
        }

    }
}());
