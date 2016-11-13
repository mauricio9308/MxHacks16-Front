(function(){
    'use strict';

    angular
        .module('legislation')
        .controller('LegislationsController', LegislationsController);

    //We inject the dependencies
    LegislationsController.$inject = ['$scope', 'LegislationService'];

    /**
     * Controller in charge of the handling of the item list view
     * */
    function LegislationsController( $scope, LegislationService ){
        //Setting the reference of the instance
        var vm = this;

        // Flag for the item loading
        vm.isLoading = false;
        vm.isInErrorState = false;
        vm.errorMessage = undefined;

        /**
         * Fetch of the Items
         * */
        function fetchItems(){
            //We set the loading flag for the loading items
            vm.isLoading = true;

            //Removing the error state flags
            vm.isInErrorState = false;
            vm.errorMessage = undefined;

            /* makes the http request for the items */
            LegislationService.getLegislations().then(function( response ){
                /* handling of the items response */
                console.log( response );
                vm.items = response;

                // Removing the loading flag
                vm.isLoading = false;
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );

                //Setting the error flag and message
                vm.isInErrorState = true;
                vm.errorMessage = errorResponse.message;

                // Removing the loading flag
                vm.isLoading = false;
            });
        }

        //On the first load we call the items fetch
        fetchItems();


        /**
         * Callback function to be called on the refresh of the fetch list
         * */
        vm.onRefreshClicked = function(){
            // We simply call the refresh cycle right now
            fetchCities();
        };

        /**
         * Callback function to be called on the click of the detail of a certain item
         * */
        vm.onItemClicked = function(){
            // TODO make a city detail state
        };


    }

}());