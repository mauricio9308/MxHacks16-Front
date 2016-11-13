/**
 * Created by mauriciolara on 7/13/16.
 */
(function(){
    'use strict';

    angular.module('countries')
        .controller('CountryCreationDialogController', CountryCreationDialogController);

    //Injecting the dependencies
    CountryCreationDialogController.$inject = ['CountriesService', '$mdDialog', 'ToastService', '$rootScope'];

    function CountryCreationDialogController(CountriesService, $mdDialog, ToastService, $rootScope){
        // Self reference for the controller
        var vm = this;

        // Reference for the country creation object
        vm.countryInformation = {};

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
        vm.createCountry = function( form ){
            if( !form.$valid ){
                return; // The form is not valid, nothing to process
            }

            /* we create the country in the server */
            CountriesService.createCountry( vm.countryInformation)
                .then(function( response ){
                    /* success creating the country in the server */
                    ToastService.showToast('Éxito al crear país');

                    //We dismiss the dialog
                    vm.cancel( form );

                    //We inform the reload of the countries list
                    $rootScope.$emit('CountryListUpdate');
                }).catch(function( errorResponse ){
                    /* error creating the country */
                    alert('Hubo un error al crear el país');

                    console.error( errorResponse );
                });
        };
    }

}());