(function () {
    'use strict';

    angular
        .module('users.services')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$q', 'ApiValues', 'TokenHandlerService', 'CurrentSessionService', '$localStorage'];

    /**
     * Service in charge of the handling of the authentication request for the API
     * */
    function AuthenticationService($http, $q, ApiValues, TokenHandlerService, CurrentSessionService, $localStorage) {

        //public API
        return {
            signIn: signIn,
            signUp: signUp,
            logout : logout,
            refreshShortDurationToken: refreshShortDurationToken,
            refreshLongDurationToken: refreshLongDurationToken
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

                    /* updating the token references */
                    TokenHandlerService.setCredentials(
                        responseData.shortDurationToken,
                        responseData.longDurationToken,
                        responseData.extraLongDurationToken
                    );

                    //Getting the reference of the user
                    var signInUser = responseData.userInfo;

                    /* saving the current session information */
                    CurrentSessionService.setUserInformation(
                        signInUser.firstName,
                        signInUser.lastName,
                        signInUser.profileImageURL,
                        signInUser.workerId
                    );

                    // Returning the success
                    signInDefer.resolve( response.data );
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
        function signUp( firstName, lastName, city, telephone, password, email ) {
            //Creating the sign up defer object
            var signUpDefer = $q.defer();

            /* validating the pass of the data */
            if( !firstName || !lastName || !city || !telephone || !password || !email ){
                //Not all the parameters were passed
                signUpDefer.reject({
                   message: 'You need to provide all the sign up parameters'
                });
            }

            //Building the sign up data
            var signUpData = {
                firstName : firstName,
                lastName : lastName,
                city : city,
                telephone : telephone,
                password: password,
                email : email
            };

            /* doing the sign up request */
            $http.post( ApiValues.buildAbsolutePath( 'auth/signup/1'), signUpData)
                .then(function( response ){
                    /* successful sign up */
                    var responseData = response.data;

                    //Setting the login credentials
                    TokenHandlerService.setCredentials(
                        responseData.shortDurationToken,
                        responseData.longDurationToken,
                        responseData.extraLongDurationToken
                    );

                    //Getting the reference of the user
                    var signInUser = responseData.user;

                    /* saving the current session information */
                    CurrentSessionService.setUserInformation(
                        signInUser.firstName,
                        signInUser.lastName,
                        signInUser.profileImageURL,
                        signInUser.workerId
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

        /**
         * Refreshes the current short duration token from the API
         * */
        function refreshShortDurationToken() {
            //Creating the defer object
            var refreshDefer = $q.defer();

            /* data to be sent to the server */
            var refreshPayload = {
                longDurationToken: TokenHandlerService.getLongDurationToken()
            };

            /* requesting the token update */
            $http.post(ApiValues.buildAbsolutePath( 'auth/refresh/token/short' ), refreshPayload)
                .then(function (response) {
                    /* handling the successful result */
                    var refreshResult = response.data;

                    //We set the short duration token
                    TokenHandlerService.setShortDurationToken( refreshResult.shortDurationToken );

                    //We resolve the successful response
                    refreshDefer.resolve( true );
                }).catch(function (response) {
                    /* handling the error response from the server */
                    console.debug( JSON.stringify( response.data  ));

                    //Rejecting the response
                    refreshDefer.reject( response.data );
                });

            //Returning the promise object
            return refreshDefer.promise;
        }

        /**
         * Refreshes the current long duration token from the API
         * */
        function refreshLongDurationToken() {
            //Creating the defer object
            var refreshDefer = $q.defer();

            /* building the request data */
            var refreshPayload = {
                extraLongDurationToken : TokenHandlerService.getExtraLongDurationToken()
            };

            /* requesting the long duration update */
            $http.post( ApiValues.buildAbsolutePath( 'auth/refresh/token/long'), refreshPayload )
                .then(function( response ){
                    /* handling the success scenario */
                    var refreshResult = response.data;

                    //Setting the tokens provided
                    TokenHandlerService.setLongDurationTokens(
                        refreshResult.longDurationToken,
                        refreshResult.extraLongDurationToken
                    );

                    //Resolving successfully the token refresh request
                    refreshDefer.resolve( true );
                }).catch(function( response ){
                    /* handling the error response scenario */
                    console.debug( JSON.stringify( response.data ));

                    refreshDefer.reject( response.data );
                });

            return refreshDefer.promise;
        }

    }
}());
