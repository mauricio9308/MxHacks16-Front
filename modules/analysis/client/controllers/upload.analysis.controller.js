(function(){
    'use strict';

    angular
        .module('legislation')
        .controller('UploadAnalysisController', UploadAnalysisController);

    //We inject the dependencies
    UploadAnalysisController.$inject = [ '$stateParams', 'LegislationService', 'ToastService', '$state'];

    /**
     * Controller in charge of the handling of the item list view
     * */
    function UploadAnalysisController( $stateParams, LegislationService, ToastService, $state){
        //Setting the reference of the instance
        var vm = this;

        // reference for the comment
        vm.analysis = '';

        /**
         * Fetch of the Legislation
         * */
        function fetchLegislation(){
            /* makes the http request for the items */
            LegislationService.getLegislation($stateParams.legislation).then(function( response ){
                /* handling of the items response */
                console.log( 'Loaded legislation: ' + JSON.stringify(response ) );
                vm.legislation = response[0];
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );
            });
        }

        // Getting the legislation data
        fetchLegislation();

        /**
         * Callback for the send of a new analysis to the service
         * */
        vm.sendAnalysis = function(){
            /* makes the http request for sending a comment */
            LegislationService.createLegislationAnalysis(vm.analysis, $stateParams.legislation).then(function( response ){
                // We just show a simple message
                ToastService.showToast('Éxito al enviar el tu análisis');

                // We go to the legislation
                vm.goToLegislation();
            }).catch(function( errorResponse ){
                /* handling of the error response */
                ToastService.showToast( errorResponse.message );
            });
        };

        /**
         * Callback for the open of a politic view
         * */
        vm.goToLegislation = function(){
            $state.go('legislation-detail', { legislation: $stateParams.legislation});
        };
    }

}());