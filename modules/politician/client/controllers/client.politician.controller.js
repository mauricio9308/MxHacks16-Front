(function(){
    'use strict';

    angular
        .module('legislation')
        .controller('PoliticianController', PoliticianController);

    //We inject the dependencies
    PoliticianController.$inject = ['$scope', 'PoliticianService', '$state', '$stateParams'];

    /**
     * Controller in charge of the handling of the item list view
     * */
    function PoliticianController( $scope, PoliticianService, $state, $stateParams ){
        //Setting the reference of the instance
        var vm = this;

        // Flag for the item loading
        vm.isLoading = false;
        vm.isInErrorState = false;
        vm.errorMessage = undefined;

        console.log('id value: ' + JSON.stringify($stateParams));

        /**
         * Fetch of a Politician
         * */
        function fetchPolitician(){
            //We set the loading flag for the loading items
            vm.isLoading = true;

            //Removing the error state flags
            vm.isInErrorState = false;
            vm.errorMessage = undefined;

            /* makes the http request for the items */
            PoliticianService.getPolitician($stateParams.id).then(function( response ){
                /* handling of the items response */
                console.log( response );
                vm.politician = response;

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

        // Fetch of a politician
        fetchPolitician();

        /**
         * Callback function to be called on the refresh of the fetch list
         * */
        vm.onRefreshClicked = function(){
            // We simply call the refresh cycle right now
            fetchPolitician();
        };

        /**
         * Callback function to be called on the click of the detail of a certain item
         * */
        vm.onItemClick = function( legislation ){
            //console.log('GO');
            //$state.go('legislation-detail', { legislation: legislation._id });
        };


    }

}());