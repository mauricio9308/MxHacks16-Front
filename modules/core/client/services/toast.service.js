/**
 * Created by mauriciolara on 6/16/16.
 */
(function(){
    'use strict';

    angular.module('core')
        .factory('ToastService', ToastService);

    ToastService.$inject =['$mdToast'];

    /**
     * Helper service for the display of Material Toast Messages
     * */
    function ToastService( $mdToast ){

        //Default value for the hide delay
        var DEFAULT_HIDE_DELAY = 3000;

        //Public API
        return {
            showToast : showToast,
            showToastWithPosition : showToastWithPosition
        };

        /**
         * Shows a simple toast message in the default position ( bottom right )
         * */
        function showToast( message ){
            $mdToast.show(
                $mdToast.simple()
                    .textContent( message ) //Building the toast with the given message
                    .position('bottom right')
                    .hideDelay(DEFAULT_HIDE_DELAY)
            );
        }

        /**
         * Shows a simple toast message with the provided position
         * */
        function showToastWithPosition( message, position ){
            $mdToast.show(
                $mdToast.simple()
                    .textContent( message ) //Building the toast with the given message
                    .position( position )
                    .hideDelay(DEFAULT_HIDE_DELAY)
            );
        }
    }

}());