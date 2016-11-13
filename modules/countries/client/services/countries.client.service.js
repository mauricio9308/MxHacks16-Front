/**
 * Created by mauriciolara on 7/8/16.
 */
(function () {
    'use strict';

    angular.module('countries')
        .factory('CountriesService', CountriesService);

    //Injecting of the dependencies
    CountriesService.$inject = ['$q', '$http', 'ApiValues', 'ValidationHelper'];

    function CountriesService($q, $http, ApiValues, ValidationHelper) {

        // Public API
        return {
            getCountries: getCountries,
            createCountry: createCountry,
            editCountry: editCountry,
            getCountry: getCountry
        };

        /**
         * Creates a new country in the database
         * */
        function createCountry(countryInformation) {
            //Creating the defer object
            var createCountryDefer = $q.defer();

            /* we verify the incoming object */
            if (!countryInformation || !countryInformation.name || !countryInformation.countryCode) {
                createCountryDefer.reject('No proporcionaste la información suficiente');
                return createCountryDefer.promise;
            }

            if (!ValidationHelper.isString(countryInformation.name) || !ValidationHelper.isString(countryInformation.countryCode)) {
                createCountryDefer.reject('Por favor valida el tipo de información dada');
                return createCountryDefer.promise;
            }

            /* we build the object for the country creation  */
            var newCountry = {
                name: countryInformation.name,
                countryCode: countryInformation.countryCode
            };

            /* we make the create country petition */
            $http.post(ApiValues.buildAdminAbsolutePath('country'), newCountry)
                .then(function (response) {
                    /* success creating the new country */
                    console.debug(JSON.stringify(response.data));

                    //We return the new created country via the defer
                    createCountryDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error creating the country object */
                console.error('Error creating the country in the server');
                console.error(JSON.stringify(errorResponse.data));

                createCountryDefer.reject(errorResponse.data);
            });

            // promise return
            return createCountryDefer.promise;
        }

        /**
         * Updates the information of a given country
         * */
        function editCountry(countryId, countryInformation) {
            //Creating the defer object
            var editCountryDefer = $q.defer();

            /* we verify the incoming object */
            if (!countryInformation || !countryInformation.name || !countryInformation.countryCode || !countryId) {
                editCountryDefer.reject('No proporcionaste la información suficiente');
                return editCountryDefer.promise;
            }

            /* we validate the data types of the provided info */
            if (!ValidationHelper.isString(countryInformation.name) || !ValidationHelper.isString(countryInformation.countryCode) || !ValidationHelper.isString(countryId)) {
                editCountryDefer.reject('Por favor valida el tipo de información dada');
                return editCountryDefer.promise;
            }

            /* we build the object for the country update  */
            var countryUpdatePayload = {
                name: countryInformation.name,
                countryCode: countryInformation.countryCode
            };

            /* we make the update country petition */
            $http.put(ApiValues.buildAdminAbsolutePath('country/' + countryId), countryUpdatePayload)
                .then(function (response) {
                    /* success updating the country */
                    console.debug(JSON.stringify(response.data));

                    //We return the updated message
                    editCountryDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error updating the country object */
                console.error('Error updating the country in the server');
                console.error(JSON.stringify(errorResponse.data));

                // We return the error message
                editCountryDefer.reject(errorResponse.data);
            });

            // promise return
            return editCountryDefer.promise;
        }

        /**
         * Fetch of the countries from the server
         * */
        function getCountries() {
            var countriesDefer = $q.defer();

            /* fetch of the countries list */
            $http.get(ApiValues.buildAdminAbsolutePath('country'))
                .then(function (response) {
                    /* success getting the list of the countries */
                    countriesDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the countries list */
                countriesDefer.reject(errorResponse.data);
            });

            return countriesDefer.promise;
        }

        /**
         * Fetch a country from the server with the given id
         * */
        function getCountry(countryId) {
            var countryDefer = $q.defer();

            /* we validate that the country id is passed */
            if (!countryId) {
                countryDefer.reject('Debes proporcionar un ID de país');
                return countryDefer.promise;
            }

            /* we validate the type of the country id */
            if (!ValidationHelper.isString(countryId)) {
                countryDefer.reject('Verifica el tipo de dato proporcionado');
                return countryDefer.promise;
            }

            /* fetch of the countries list */
            $http.get(ApiValues.buildAdminAbsolutePath('country/' + countryId))
                .then(function (response) {
                    /* success getting the country information */
                    countryDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                    /* error getting the country information */
                    countryDefer.reject(errorResponse.data);
                });

            return countryDefer.promise;
        }

    }

}());