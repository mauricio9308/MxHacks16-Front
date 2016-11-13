/**
 * Created by mauriciolara on 7/8/16.
 */
(function () {
    'use strict';

    angular
        .module('states')
        .controller('StatesController', StatesController);

    //Injection of the dependencies
    StatesController.$inject = ['StatesService', 'CountriesService', '$state', '$stateParams',
        '$mdDialog', '$scope', '$rootScope', '$mdMedia'];

    /**
     * Controller in charge of the handling of the countries
     * */
    function StatesController(StatesService, CountriesService, $state, $stateParams,
                              $mdDialog, $scope, $rootScope, $mdMedia) {
        //Reference for the controller instance
        var vm = this;

        // Flag for the countries loading
        vm.isLoading = false;
        vm.isInErrorState = false;
        vm.errorMessage = undefined;

        // Reference for the selected filter country
        vm.selectedCountry = undefined;
        vm.previousSelection = undefined;

        //Reference variable for the resolution of the state creation dialog
        vm.customFullscreen = undefined;

        /**
         * Fetch of the states of a given country
         *
         * @param filterCountry Represents a filter for the country from which the states will be obtained
         * */
        function fetchStates( filterCountry ) {
            //We set the loading flag for the states
            vm.isLoading = true;

            //Removing the error state flags
            vm.isInErrorState = false;
            vm.errorMessage = undefined;

            /* makes the http request for the states */
            StatesService.getStates( filterCountry ).then(function (response) {
                /* handling of the states response */
                console.log(response);
                vm.states = response;

                // Removing the loading flag
                vm.isLoading = false;
            }).catch(function (errorResponse) {
                /* handling of the error response */
                console.log(errorResponse);

                //Setting the error flag and message
                vm.isInErrorState = true;
                vm.errorMessage = errorResponse.message;

                // Removing the loading flag
                vm.isLoading = false;
            });
        }

        //On the first load we call the states loading
        fetchStates();

        /**
         * Fetch of the countries for the filter selector
         * */
        function fetchCountries() {
            /* we proceed with the fetch of the countries */
            CountriesService.getCountries().then(function (countries) {
                /* success fetch of the countries */
                vm.countries = countries; // We set the reference in the select

                //We set a previous selection for the filter if provided via route query params
                if( $stateParams.countryId ){
                    vm.previousSelection = $stateParams.countryId;
                    vm.selectedCountry  = $stateParams.countryId;
                }
            }).catch(function (errorResponse) {
                /* error setting the states reference */
                console.error('Error getting the countries reference for the selector');
            });
        }

        //We fetch the countries on the first load
        fetchCountries();


        /**
         * We listen to any pending update to the state list
         * */
        $rootScope.$on('StateListUpdate', function (event) {
            console.debug('Update of the country list');

            //We stop the propagation of the event
            event.stopPropagation();

            fetchStates( vm.selectedCountry ); // We update the country list
        });


        /**
         * Callback for the country selection
         * */
        vm.onCountrySelected = function(){
            if( vm.previousSelection === vm.selectedCountry ){
                return; // There's nothing to do here...
            }

            // Saving the reference
            vm.previousSelection = vm.selectedCountry;

            // We update the states fetch function
            fetchStates( vm.selectedCountry );
        };

        /**
         * Callback function for the refresh button
         * */
        vm.onRefreshClicked = function () {
            // We call the countries fetch method
            fetchStates( vm.selectedCountry );
        };

        /**
         * Callback function for the click of a state
         * */
        vm.onStateClicked = function (state) {
            // We go to the detail of the given state
            $state.go('state-detail', {stateId: state._id});
        };

        /**
         * Callback for the click on add state button
         * */
        vm.createState = function(){
            // Determines if the state dialog should be displayed in full screen
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) || vm.customFullscreen;

            /* we create the country creation dialog */
            $mdDialog.show({
                controller: 'StateCreationDialogController as vm',
                templateUrl: 'modules/states/client/views/state.creation.client.view.html',
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