/**
 * Created by Mauricio Lara on 7/8/16.
 */
(function(){
    'use strict';

    angular.module('states')
        .factory('StatesService', StatesService);

    //Declaring the service dependencies
    StatesService.$inject = ['$q', '$http', 'ApiValues', 'ValidationHelper'];

    /**
     * Service in charge of the handling of the states transactions
     * */
    function StatesService($q, $http, ApiValues, ValidationHelper){
        //Public API
        return {
            getStates : getStates,
            createState : createState,
            updateState : updateState
        };

        /**
         * Creates a new state in the database
         * */
        function createState( stateInformation ){
            //Creating the defer object
            var stateCreationDefer = $q.defer();

            /* we verify the incoming object */
            if( !stateInformation || !stateInformation.name || !stateInformation.countryId ){
                stateCreationDefer.reject('No proporcionaste la información suficiente');
                return stateCreationDefer.promise;
            }

            /* we validate the provided information */
            if( !ValidationHelper.isString( stateInformation.name ) ||
                !ValidationHelper.isString( stateInformation.countryId) ){
                stateCreationDefer.reject('Por favor valida el tipo de información dada');
                return stateCreationDefer.promise;
            }

            /* we build the object for the state creation  */
            var newState = {
                name : stateInformation.name,
                countryId : stateInformation.countryId
            };

            /* we make the create state petition */
            $http.post( ApiValues.buildAdminAbsolutePath('state'), newState)
                .then(function( response ){
                    /* success creating the new state */
                    console.debug( JSON.stringify( response.data ));

                    //We return the new created state via the defer
                    stateCreationDefer.resolve( response.data );
                }).catch(function( errorResponse ){
                    /* error creating the country object */
                    console.error('Error creating the state in the server');
                    console.error( JSON.stringify(errorResponse.data) );

                    stateCreationDefer.reject( errorResponse.data );
                });

            // promise return
            return stateCreationDefer.promise;
        }

        /**
         * Updates the information of a given state
         * */
        function updateState( stateId, stateInformation ){
            //Creating the defer object
            var editStateDefer = $q.defer();

            /* we verify the incoming object */
            if( !stateInformation || !stateInformation.name || !stateInformation.countryId || !stateId ){
                editStateDefer.reject('No proporcionaste la información suficiente');
                return editStateDefer.promise;
            }

            /* we validate the data types of the provided info */
            if( !ValidationHelper.isString( stateInformation.name ) ||
                !ValidationHelper.isString( stateInformation.countryId ) ||
                !ValidationHelper.isString( stateId )){
                editStateDefer.reject('Por favor valida el tipo de información dada');
                return editStateDefer.promise;
            }

            /* we build the object for the state update  */
            var stateUpdatePayload = {
                name : stateInformation.name,
                countryId : stateInformation.countryId
            };

            /* we make the update country petition */
            $http.put( ApiValues.buildAdminAbsolutePath('state/' + stateId ), stateUpdatePayload)
                .then(function( response ){
                    /* success updating the country */
                    console.debug( JSON.stringify( response.data ));

                    //We return the updated message
                    editStateDefer.resolve( response.data );
                }).catch(function( errorResponse ){
                    /* error updating the state object */
                    console.error('Error updating the state in the server');
                    console.error( JSON.stringify(errorResponse.data) );

                    // We return the error message
                    editStateDefer.reject( errorResponse.data );
                });

            // promise return
            return editStateDefer.promise;
        }

        /**
         * Obtains the states from the DB
         * */
        function getStates( country ){
            var statesDefer = $q.defer();

            // Build of the states path
            var statesPath = ApiValues.buildAdminAbsolutePath( country ? 'state?countryId=' + country : 'state');

            /* obtaining the list of the states */
            $http.get( statesPath )
                .then(function( response ){
                    /* success getting the list of the states */
                    statesDefer.resolve( response.data );
                }).catch(function( errorResponse ){
                    /* error getting the states list */
                    statesDefer.reject( errorResponse.data );
                });

            return statesDefer.promise;
        }


    }

}());