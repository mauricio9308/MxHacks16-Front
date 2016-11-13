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
         * Sets the current credentials in the case of a login / signup
         * */
        function setCredentials( shortDurationToken ){
            $localStorage.tk1 = shortDurationToken;
        }

        /**
         * Clears the credentials stored in the client for closing the actual session in the web application
         * */
        function clearCredentials(){
            delete $localStorage.tk1;
        }
    }

}());