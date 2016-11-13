(function () {
    'use strict';

    angular.module('politician')
        .factory('PoliticianService', PoliticianService);

    //Declaring the service dependencies
    PoliticianService.$inject = ['$q', '$http', 'ApiValues'];

    function PoliticianService($q, $http, ApiValues) {
        //Public API

        return {
            getPolitician: getPolitician,
            getPoliticians: getPoliticians,
            deletePolitician: deletePolitician
        };

        /**
         * Deletes a item from the server
         * */
        function deletePolitician( itemToDelete ){
            // Promise for the delete of the item
            var itemDeleteDefer = $q.defer();

            /* we make the create delete petition */
            $http.delete(ApiValues.buildAdminAbsolutePath('politician/' + itemToDelete) )
                .then(function (response) {
                    /* success deleting the new item */
                    console.debug(JSON.stringify(response.data));

                    //We return the new created item via the defer
                    itemDeleteDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error creating the item  */
                console.error('Error deleting the item in the server');
                console.error(JSON.stringify(errorResponse.data));

                // return of the item error
                itemDeleteDefer.reject(errorResponse.data);
            });

            // promise return
            return itemDeleteDefer.promise;
        }

        /**
         * Obtains a certain item item items available in the server
         * */
        function getPolitician(item) {
            var itemListDefer = $q.defer();

            // Build of the item path
            var path = ApiValues.buildAbsolutePath('politician/' + item);

            /* obtaining the list of the item */
            $http.get(path)
                .then(function (response) {
                    /* success getting the list of the item */
                    itemListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                    /* error getting the list of items */
                    itemListDefer.reject(errorResponse.data);
            });

            return itemListDefer.promise;
        }

        /**
         * Obtains the current list of the item items available in the server
         * */
        function getPoliticians() {
            var itemListDefer = $q.defer();

            // Build of the item path
            var path = ApiValues.buildAbsolutePath('politician');

            /* obtaining the list of the item */
            $http.get(path)
                .then(function (response) {
                    /* success getting the list of the item */
                    itemListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the list of items */
                itemListDefer.reject(errorResponse.data);
            });

            return itemListDefer.promise;
        }

    }

}());