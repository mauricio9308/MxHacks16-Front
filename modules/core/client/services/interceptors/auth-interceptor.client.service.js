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
                case 499:
                case 403:
                case 401:
                    /*  error code applies to the scenario when the
                        user don't have privileges for doing the operation */
                    $injector.get('$state').transitionTo('signin');
                    break;
            }

            // otherwise, default behaviour
            return $q.reject(rejection);
        }

        /*---------HANDLER METHODS FOR THE INTERCEPTOR FLAGS-----------*/
        /**
         * Generates a configuration object with the flags for avoiding the interceptor
         * */
        function generateFlagsEvadeInterceptor() {
            var flags = {
                AUTHENTICATION: true, //Evading the authentication header
            };

            return {flags: flags};
        }

    }
}());
