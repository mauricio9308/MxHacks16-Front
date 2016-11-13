/**
 * Created by mauriciolara on 6/15/16.
 */
'use strict';
(function(){

    angular.module('users.services')
        .factory('CurrentSessionService', CurrentSessionService);

    //Adding the dependencies
    CurrentSessionService.$inject = ['$localStorage'];

    /**
     * Handler for the current session information
     * */
    function CurrentSessionService( $localStorage){

        //Public API
        return{
            isUserLoggedIn : isUserLoggedIn,
            setUserInformation : setUserInformation,
            getUserInformation : getUserInformation,
            getUserType : getUserType
        };

        /**
         * Returns true if there's a session currently active in the client
         * */
        function isUserLoggedIn(){
            return ( getUserInformation() ? true : false );
        }

        /**
         * Obtains the logged in user information
         * */
        function getUserInformation(){
            /* we obtain the user information */
            var userInfo = $localStorage.userInformation;

            //Returning the user information
            return ( userInfo ? JSON.parse( userInfo ) : null );
        }

        /**
         * Returns the current user type
         * */
        function getUserType(){
            return isUserLoggedIn() ? getUserInformation().type : -1;
        }

        /**
         * Saves the current user information
         * */
        function setUserInformation( name, email, type ){

            /* setting the information to be saved */
            var userInformationReference = {
                name : name,
                email: email,
                type: type
            };

            // Saving the user information
            $localStorage.userInformation = JSON.stringify( userInformationReference );
        }
    }

}());