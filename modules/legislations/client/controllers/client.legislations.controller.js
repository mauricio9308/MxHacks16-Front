(function(){
    'use strict';

    angular
        .module('legislation')
        .controller('LegislationsController', LegislationsController);

    //We inject the dependencies
    LegislationsController.$inject = ['$scope', 'LegislationService', 'PoliticianService', '$state'];

    /**
     * Controller in charge of the handling of the item list view
     * */
    function LegislationsController( $scope, LegislationService, PoliticianService, $state ){
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

        /**
         * Fetch of the Politicians
         * */
        function fetchPoliticians(){
            /* makes the http request for the items */
            PoliticianService.getPoliticians().then(function( response ){
                /* handling of the items response */
                console.log( 'Response for politicians: ' + JSON.stringify(response) );
                vm.politicians = response;
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );
            });
        }


        //On the first load we call the items fetch
        fetchItems();
        fetchPoliticians();


        /**
         * Callback function to be called on the refresh of the fetch list
         * */
        vm.onRefreshClicked = function(){
            // We simply call the refresh cycle right now
            fetchItems();
        };

        /**
         * Callback function to be called on the click of the detail of a certain item
         * */
        vm.onItemClick = function( legislation ){
            console.log('GO');
            $state.go('legislation-detail', { legislation: legislation._id });
        };


    }

}());