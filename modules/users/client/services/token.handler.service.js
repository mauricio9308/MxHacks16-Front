/**
 * Created by mauriciolara on 6/15/16.
 */
(function(){
    'use script';

    angular.module('users.services')
        .factory('TokenHandlerService', TokenHandlerService);

    //Adding the dependency injection
    TokenHandlerService.$inject = ['$localStorage'];

    /**
     * Service in charge of the handling of the current tokens of the application
     * */
    function TokenHandlerService( $localStorage ){

        //Public API
        return {
            getShortDurationToken : getShortDurationToken,
            setShortDurationToken : setShortDurationToken,
            getLongDurationToken : getLongDurationToken,
            getExtraLongDurationToken : getExtraLongDurationToken,
            setLongDurationTokens : setLongDurationTokens,
            setCredentials : setCredentials,
            clearCredentials : clearCredentials
        };

        /**
         * Recovers the short duration token from the local storage
         * */
        function getShortDurationToken(){
            return $localStorage.tk1; // Obfuscated name for the short duration
        }

        /**
         * Sets the short duration token in the local storage
         * */
        function setShortDurationToken( shortDurationToken ){
            $localStorage.tk1 = shortDurationToken;
        }

        /**
         * Recovers the long duration token from the local storage
         * */
        function getLongDurationToken(){
            return $localStorage.tk2;
        }

        /**
         * Sets the long and extra long duration tokens for the client
         * */
        function setLongDurationTokens( longDurationToken, extraLongDurationToken ){
            //Setting the long duration token
            $localStorage.tk2 = longDurationToken;

            //Only setting the extra long duration token if it's passed
            if( extraLongDurationToken ){
                $localStorage.tk3 = extraLongDurationToken;
            }
        }

        /**
         * Recovers the extra long duration token from the local storage
         * */
        function getExtraLongDurationToken(){
            return $localStorage.tk3;
        }

        /**
         * Sets the current credentials in the case of a login / signup
         * */
        function setCredentials( shortDurationToken, longDurationToken, extraLongDurationToken ){
            $localStorage.tk1 = shortDurationToken;
            $localStorage.tk2 = longDurationToken;
            $localStorage.tk3 = extraLongDurationToken;
        }

        /**
         * Clears the credentials stored in the client for closing the actual session in the web application
         * */
        function clearCredentials(){
            delete $localStorage.tk1;
            delete $localStorage.tk2;
            delete $localStorage.tk3;
        }
    }

}());