/**
 * Created by mauriciolara on 7/8/16.
 */
(function () {
    'use strict';

    angular.module('countries')
        .controller('CountriesController', CountriesController);

    //Injecting the dependencies
    CountriesController.$inject = ['CountriesService', '$mdMedia', '$mdDialog',
        '$scope', '$rootScope', '$state'];

    /**
     * Controller in charge of the handling of the countries
     * */
    function CountriesController(CountriesService, $mdMedia, $mdDialog,
                                 $scope, $rootScope, $state) {
        //Reference for the controller instance
        var vm = this;

        // Flag for the countries loading
        vm.isLoading = false;
        vm.isInErrorState = false;
        vm.errorMessage = undefined;

        //Reference variable for the resolution of the country creation dialog
        vm.customFullscreen = undefined;

        /**
         * Fetch of the countries
         * */
        function fetchCountries() {
            //We set the loading flag for the countries
            vm.isLoading = true;

            //Removing the error state flags
            vm.isInErrorState = false;
            vm.errorMessage = undefined;

            /* makes the http request for the countries */
            CountriesService.getCountries().then(function (response) {
                /* handling of the countries response */
                vm.countries = response;

                // Removing the loading flag
                vm.isLoading = false;
            }).catch(function (errorResponse) {
                /* handling of the error response */
                console.error(errorResponse);

                //Setting the error flag and message
                vm.isInErrorState = true;
                vm.errorMessage = errorResponse.message;

                // Removing the loading flag
                vm.isLoading = false;
            });
        }

        //On the first load we call the countries loading
        fetchCountries();

        /**
         * Callback function for the refresh button
         * */
        vm.onRefreshClicked = function () {
            // We call the countries fetch method
            fetchCountries();
        };

        /**
         * Callback function for the click of a country
         * */
        vm.onCountryClicked = function ( country ) {
            console.log( 'Selected country', JSON.stringify( country ) );
            $state.go('country-detail', { countryId : country._id });
        };


        /**
         * We listen to any pending update to the country list
         * */
        $rootScope.$on('CountryListUpdate', function (event) {
            console.debug('Update of the country list');

            //We stop the propagation of the event
            event.stopPropagation();

            fetchCountries(); // We update the country list
        });

        /**
         * Shows the country creation dialog
         * */
        vm.addCountry = function (event) {
            // Determines if the country dialog should be displayed in full screen
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) || vm.customFullscreen;

            /* we create the country creation dialog */
            $mdDialog.show({
                controller: 'CountryCreationDialogController as vm',
                templateUrl: 'modules/countries/client/views/country.creation.client.view.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });

            /* we watch with the scope the changes to medium or small material sizes */
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
        };
    }

}());