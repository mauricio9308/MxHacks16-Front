(function(){
    'use strict';

    angular
        .module('legislation')
        .controller('LegislationDetailController', LegislationDetailController);

    //We inject the dependencies
    LegislationDetailController.$inject = ['$scope', '$stateParams', 'LegislationService', 'ToastService', '$state'];

    /**
     * Controller in charge of the handling of the item list view
     * */
    function LegislationDetailController( $scope, $stateParams, LegislationService, ToastService, $state){
        //Setting the reference of the instance
        var vm = this;

        // reference for the comment
        vm.comment = '';

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


        /**
         * Fetch of the Legislation Comments
         * */
        function fetchLegislationComments(){
            /* makes the http request for the items */
            LegislationService.listLegislationComments($stateParams.legislation).then(function( response ){
                /* handling of the items response */
                console.log( 'Loaded legislation comments: ' + JSON.stringify(response ) );
                vm.comments = response;
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );
            });
        }
        /**
         * Fetch of the Legislation Analysis
         * */
        function fetchLegislationAnalysis(){
            /* makes the http request for the items */
            LegislationService.listLegislationAnalysis($stateParams.legislation).then(function( response ){
                /* handling of the items response */
                console.log( 'Loaded legislation comments: ' + JSON.stringify(response ) );
                vm.analysis = response;
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );
            });
        }

        //On the first load we call the items fetch
        fetchLegislation();
        fetchLegislationComments();
        fetchLegislationAnalysis();


        /**
         * Callback function to be called on the refresh of the fetch list
         * */
        vm.onRefreshClicked = function(){
            // We simply call the refresh cycle right now
            fetchLegislation();
        };

        /**
         * Sends a positive vote for the petition
         * */
        vm.sendPositiveVote = function(){
            /* makes the http request for sending a positive vote */
            LegislationService.addPositiveVote($stateParams.legislation).then(function( response ){
                // We add a positive vote
                vm.legislation.positiveVotes = vm.legislation.positiveVotes + 1;

                // We just show a simple message
                ToastService.showToast('¡Gracias por tu voto!');
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );
            });
        };

        /**
         * Sends a negative vote for the petition
         * */
        vm.sendNegativeVote = function(){
            /* makes the http request for sending a negative vote */
            LegislationService.addNegativeVote($stateParams.legislation).then(function( response ){
                // We add a positive vote
                vm.legislation.negativeVotes += 1;

                // We just show a simple message
                ToastService.showToast('¡Gracias por tu voto!');
            }).catch(function( errorResponse ){
                /* handling of the error response */
                console.log( errorResponse );
            });
        };

        /**
         * Callback for the selection of the comments
         * */
        vm.sendComment = function(){
            /* makes the http request for sending a comment */
            LegislationService.sendComment($stateParams.legislation, vm.comment).then(function( response ){
                //Reset of the comment data
                vm.comment = '';

                // We just show a simple message
                ToastService.showToast('Éxito al enviar el comentario');

                // We send the comment
                fetchLegislationComments();
            }).catch(function( errorResponse ){
                /* handling of the error response */
                ToastService.showToast( errorResponse.message );
            });
        };

        /**
         * Callback for the open of a politic view
         * */
        vm.viewPolitician = function( politic ){
            $state.go('politician-detail', { id: politic._id});
        };

        vm.createAnalysis = function( legislation ){
            $state.go('create-analysis', { legislation: legislation._id})
        }
    }

}());