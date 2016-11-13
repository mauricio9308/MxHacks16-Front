/**
 * Created by mauriciolara on 7/8/16.
 */
(function(){
    'use strict';

    angular
        .module('cities')
        .controller('CitiesController', CitiesController);

    //We inject the dependencies
    CitiesController.$inject = ['$scope', 'CitiesService'];

    /**
     * Controller in charge of the handling of the cities list view
     * */
    function CitiesController( $scope, CitiesService ){
        //Setting the reference of the instance
        var vm = this;

        // Flag for the cities loading
        vm.isLoading = false;
        vm.isInErrorState = false;
        vm.errorMessage = undefined;

        /**
         * Fetch of the cities
         * */
        function fetchCities(){
            //We set the loading flag for the cities
            vm.isLoading = true;

            //Removing the error state flags
            vm.isInErrorState = false;
            vm.errorMessage = undefined;

            /* makes the http request for the cities */
            CitiesService.getCities().then(function( response ){
                /* handling of the cities response */
                console.log( response );
                vm.cities = response;

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

        //On the first load we call the cities loading
        fetchCities();


        /**
        * Callback function to be called on the refresh of the cities list
        * */
        vm.onRefreshClicked = function(){
            // We simply call the refresh cycle right now
            fetchCities();
        };

        /**
         * Callback function to be called on the click of the detail of a certain city
         * */
        vm.onCityClicked = function(){
            // TODO make a city detail state
        };


    }

}());