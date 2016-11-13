(function () {
    'use strict';

    angular
        .module('core')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$injector', 'TokenHandlerService', 'ApiValues', 'HttpBuffer'];

    /**
     * Interceptor in charge of the handling of the API requests
     * */
    function authInterceptor($q, $injector, TokenHandlerService, ApiValues, HttpBuffer) {

        /* INTERCEPTOR FLAGS */
        var isRefreshTokenOperationActive = false;
        var tokenRefreshAttemptsCount = 0;

        //Public API for the request interceptor
        return {
            request : requestInterceptor,
            responseError: responseError,
            generateFlagsEvadeInterceptor : generateFlagsEvadeInterceptor
        };

        /**
         * Handler of the HTTP configuration request object to be sent to the api
         * */
        function requestInterceptor( httpConfig ){
            //Adding the authentication header if its accepted
            if( ( !httpConfig.flags || !httpConfig.flags.AUTHENTICATION ) ){

                var shortDurationToken = TokenHandlerService.getShortDurationToken();
                //Adding the token only if it's set
                if( shortDurationToken ){
                    httpConfig.headers.Authorization =
                        'Bearer '.concat(shortDurationToken.replace(/['"]+/g, ''));
                }
            }

            //Only removing the accept header if it's requested
            if( !httpConfig.flags || !httpConfig.flags.ACCEPT ){
                httpConfig.headers.Accept = ApiValues.acceptHeader;
            }

            //We return the modified request configuration
            return httpConfig;
        }

        /**
         * Handler of the response error cases (Non 2XX HTTP codes)
         * */
        function responseError(rejection) {
            //Logging the handling of the error response
            console.error('Interceptor Error');
            console.error( JSON.stringify( rejection.data ) );

            /* we handle the error cases */
            switch (rejection.status) {
                case 498:
                    if( !TokenHandlerService.getShortDurationToken() ){
                        console.log('Not passing the token refresh cycle');
                        break; // We are handling an exception case in the login of the application
                    }

                    // Update access token work flow
                    console.log('Requesting a new access token');

                    // Authentication error we proceed with the token update handling
                    var retryPetitionBufferDefer = $q.defer();

                    // Adding the http petition to the buffer
                    HttpBuffer.append( rejection.config, retryPetitionBufferDefer );

                    /* we try to obtain the refresh token */
                    if( !isRefreshTokenOperationActive ){
                        updateTokens();
                    }

                    return retryPetitionBufferDefer.promise;
                case 499:
                case 403:
                case 401:
                    /* 403 error code applies to the scenario when the
                        user don't have privileges for doing the operation */
                    $injector.get('$state').transitionTo('forbidden');
                    break;
            }

            // otherwise, default behaviour
            return $q.reject(rejection);
        }

        /**
         * Handler function for the refresh of the authentication tokens
         * */
        function updateTokens(){
            //First of all we set the update flag up
            isRefreshTokenOperationActive = true;

            //We inject the necessary API services
            var authenticationService = $injector.get('AuthenticationService');
            var $state = $injector.get('$state');

            //Adding the attempt to the refresh counter
            tokenRefreshAttemptsCount ++;

            /* we try to update the token */
            authenticationService.refreshShortDurationToken().then( function(){
                /* success updating the token request, the tokens are already updated via the AuthenticationService */

                //We proceed with resolving the pending request of the service
                var updater = function( config ){
                    return config;
                };
                HttpBuffer.retryAll( updater );

                //We remove the flag of the update process
                isRefreshTokenOperationActive = false;
            }).catch(function( response ){
                console.debug('Error updating the response in the interceptor');
                console.debug( JSON.stringify( response ));

                /* error updating the token */
                //We validate if we have already tried the max number of attempts
                if( tokenRefreshAttemptsCount == ApiValues.tokenRefreshMaxRetries ){
                    /* maximum attempts reached */
                    HttpBuffer.rejectAll('Error updating the token');

                    //We logout the user
                    $injector.get('CurrentSessionService').logout();

                    //We restart the attempt counter
                    tokenRefreshAttemptsCount = 0;

                    //We remove the flag for the update process
                    isRefreshTokenOperationActive = false;
                }else{
                    /* we retry the token update */
                    updateTokens();
                }
            });
        }


        /*---------HANDLER METHODS FOR THE INTERCEPTOR FLAGS-----------*/
        /**
         * Generates a configuration object with the flags for avoiding the interceptor
         * */
        function generateFlagsEvadeInterceptor() {
            var flags = {
                AUTHENTICATION: true, //Evading the authentication header
                ACCEPT: true //Evading the accept header
            };

            return {flags: flags};
        }

    }
}());
