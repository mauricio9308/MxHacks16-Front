(function(){
    'use strict';

    angular.module('core')
        .factory('ValidationHelper', ValidationHelper);

    function ValidationHelper(){


        //Public API
        return {
            isString : isString
        };

        /**
         * Validates if the given variable is of String type
         * */
        function isString( variable ){
            return (typeof variable === 'string' || variable instanceof String)
        }
    }
}());