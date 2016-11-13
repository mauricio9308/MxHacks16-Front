/**
 * Created by Mauricio Lara on 6/16/16.
 */

(function(){
    'use strict';

    angular.module('cities')
        .factory('CitiesService', CitiesService);

    //Declaring the service dependencies
    CitiesService.$inject = ['$q', '$http', 'ApiValues', 'ValidationHelper'];

    function CitiesService($q, $http, ApiValues, ValidationHelper){
        //Public API
        return {
            getCities : getCities,
            createCity : createCity,
            updateCity : updateCity
        };

        /**
         * Creates a new city in the database
         * */
        function createCity( cityInformation ){
            //Creating the defer object
            var cityCreationDefer = $q.defer();

            /* we verify the incoming object */
            if( !cityInformation || !cityInformation.name || !cityInformation.stateId ){
                cityCreationDefer.reject('No proporcionaste la información suficiente');
                return cityCreationDefer.promise;
            }

            /* we validate the provided information */
            if( !ValidationHelper.isString( cityInformation.name ) ||
                !ValidationHelper.isString( cityInformation.stateId) ){
                cityCreationDefer.reject('Por favor valida el tipo de información dada');
                return cityCreationDefer.promise;
            }

            /* we build the object for the city creation  */
            var newCity = {
                name : cityInformation.name,
                stateId : cityInformation.stateId
            };

            /* we make the create state petition */
            $http.post( ApiValues.buildAdminAbsolutePath('city'), newCity)
                .then(function( response ){
                    /* success creating the new city */
                    console.debug( JSON.stringify( response.data ));

                    //We return the new created city via the defer
                    cityCreationDefer.resolve( response.data );
                }).catch(function( errorResponse ){
                    /* error creating the city object */
                    console.error('Error creating the city in the server');
                    console.error( JSON.stringify(errorResponse.data) );

                    cityCreationDefer.reject( errorResponse.data );
                });

            // promise return
            return cityCreationDefer.promise;
        }

        /**
         * Updates the information of a given city
         * */
        function updateCity( cityId, cityInformation ){
            //Creating the defer object
            var editStateDefer = $q.defer();

            /* we verify the incoming object */
            if( !cityInformation || !cityInformation.name || !cityInformation.stateId || !cityId ){
                editStateDefer.reject('No proporcionaste la información suficiente');
                return editStateDefer.promise;
            }

            /* we validate the data types of the provided info */
            if( !ValidationHelper.isString( cityInformation.name ) ||
                !ValidationHelper.isString( cityInformation.stateId ) ||
                !ValidationHelper.isString( cityId )){
                editStateDefer.reject('Por favor valida el tipo de información dada');
                return editStateDefer.promise;
            }

            /* we build the object for the city update  */
            var cityUpdatePayload = {
                name : cityInformation.name,
                stateId : cityInformation.stateId
            };

            /* we make the update country petition */
            $http.put( ApiValues.buildAdminAbsolutePath('city/' + cityId ), cityUpdatePayload)
                .then(function( response ){
                    /* success updating the country */
                    console.debug( JSON.stringify( response.data ));

                    //We return the updated message
                    editStateDefer.resolve( response.data );
                }).catch(function( errorResponse ){
                    /* error updating the city object */
                    console.error('Error updating the city in the server');
                    console.error( JSON.stringify(errorResponse.data) );

                    // We return the error message
                    editStateDefer.reject( errorResponse.data );
                });

            // promise return
            return editStateDefer.promise;
        }

        /**
         * Obtains the current list of cities in the system
         * */
        function getCities( state ){
            var citiesDefer = $q.defer();

            // Build of the states path
            var citiesPath = ApiValues.buildAdminAbsolutePath( state ? 'city?state=' + state : 'city');

            /* obtaining the list of the cities */
            $http.get( citiesPath )
                .then( function( response){
                    /* success getting the list of the cities */
                    citiesDefer.resolve( response.data );
                }).catch(function( errorResponse ){
                    /* error getting the cities list */
                    citiesDefer.reject( errorResponse.data );
                });

            return citiesDefer.promise;
        }

    }

}());