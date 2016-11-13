/**
 * Created by mauriciolara on 7/14/16.
 */
(function(){
    'use strict';

    angular.module('countries')
        .controller('CountryDetailController', CountryDetailController);

    CountryDetailController.$inject = ['CountriesService', '$stateParams', '$state', 'ToastService'];

    /**
     * Controller in charge of the view of the country information display
     * */
    function CountryDetailController(CountriesService, $stateParams, $state, ToastService){
        // Self reference for the country controller
        var vm = this;

        /* flags for the loading state */
        vm.isLoading = undefined;
        vm.isInErrorState = false;
        vm.errorMessage = undefined;
        vm.countryInfo = undefined;

        /**
         * We fetch the information of a given country
         * */
        function fetchCountryInformation(){
            // Setting the loading flag
            vm.isLoading = true;

            /* fetching the country information */
            CountriesService.getCountry( $stateParams.countryId)
                .then(function( countryInfo ){
                    /* success fetching the country information */
                    console.log( countryInfo );

                    // Setting the country information
                    vm.countryInfo = countryInfo;

                    //Removing the load flag
                    vm.isLoading = false;
                    vm.isInErrorState = false;
                }).catch(function( errorResponse ){
                    console.error( JSON.stringify( errorResponse ) );

                    // Setting the error flag
                    vm.isInErrorState = true;

                    //Removing the load flag
                    vm.isLoading = false;
                });
        }

        //On the first instance we load the country information
        fetchCountryInformation();

        /**
         * Updates the information of the country with the form info
         * */
        vm.updateCountry = function( form ){
            if( !form.$valid ){
                return; // The form is not valid
            }

            // Setting the loading state
            vm.isLoading = true;

            /* we create the country in the server */
            CountriesService.editCountry( $stateParams.countryId, vm.countryInfo )
                .then(function( response ){
                    /* success creating the country in the server */
                    ToastService.showToast( response.message );

                    // Reset form
                    resetForm( form );

                    // We remove the loading state
                    vm.isLoading = false;

                    // We transition to the country list state
                    $state.go('country-list');
                }).catch(function( errorResponse ){
                    /* error creating the country */
                    console.error( errorResponse );

                    vm.errorMessage = errorResponse;
                    vm.isInErrorState = true;

                    // We remove the loading state
                    vm.isLoading = false;
                });
        };

        /**
         * Resets the form fields for new instances
         * */
        function resetForm( form ){
            if( form ){
                form.$setPristine();
                form.$setUntouched();
            }
        }

        /**
         * Cancels the country update process
         * */
        vm.cancel = function( form ){
            // We reset the form
            resetForm( form );

            // We go back to the previous state
            $state.go('country-list');
        }

    }
}());