/**
 * Created by mauriciolara on 7/14/16.
 */
(function(){
    'use strict';

    angular.module('states')
        .controller('StateCreationDialogController', StateCreationDialogController);

    //Adding the dependencies
    StateCreationDialogController.$inject = ['CountriesService', 'StatesService', '$mdDialog', 'ToastService', '$rootScope'];

    /**
     * Controller in charge of the actions in the state creation controller
     * */
    function StateCreationDialogController( CountriesService, StatesService, $mdDialog, ToastService, $rootScope ){
        // Self reference for the controller
        var vm = this;

        // Reference for the country creation object
        vm.countryInformation = {};

        // Holder of the fetched countries from the server
        vm.countries = undefined;
        vm.selectedCountry = undefined;

        /**
         * Fetch of the countries for the filter selector
         * */
        function fetchCountries() {
            /* we proceed with the fetch of the countries */
            CountriesService.getCountries().then(function (countries) {
                /* success fetch of the countries */
                vm.countries = countries; // We set the reference in the select
            }).catch(function (errorResponse) {
                /* error setting the states reference */
                console.error('Error getting the countries reference for the selector');

                // Showing error message
                ToastService.showToast('Error al obtener países');

                // Cancel the display of the dialog
                $mdDialog.cancel();
            });
        }

        //We fetch the countries on the first load
        fetchCountries();

        /**
         * Closes the dialog for the country creation
         * */
        vm.cancel = function( form ){
            /* we reset the form */
            if( form ){
                form.$setPristine();
                form.$setUntouched();
            }
            $mdDialog.cancel(); // Close of the current dialog
        };

        /**
         * Creates a new country in base of the information
         * */
        vm.createState = function( form ){
            if( !form.$valid ){
                console.log('Invalid form');
                return; // The form is not valid, nothing to process
            }

            /* validate the country selection */
            if( !vm.selectedCountry ){
                alert('Debes seleccionar un país');
                return; // Must select a country
            }

            /* creating the state information payload */
            var stateInfo = {
                name: vm.stateInformation.name,
                countryId : vm.selectedCountry
            };

            /* we create the country in the server */
            StatesService.createState( stateInfo )
                .then(function( response ){
                    /* success creating the state in the server */
                    ToastService.showToast('Éxito al crear país');

                    //We dismiss the dialog
                    vm.cancel( form );

                    //We inform the reload of the states list
                    $rootScope.$emit('StateListUpdate');
                }).catch(function( errorResponse ){
                /* error creating the country */
                alert('Hubo un error al crear el país');

                console.error( errorResponse );
            });
        };
    }
}());