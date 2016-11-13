(function () {
    'use strict';

    angular
        .module('core')
        .controller('HomeController', HomeController);

    //Adding the dependencies
    HomeController.$inject = ['$state'];

    function HomeController($state) {
        var vm = this;

        /**
         * Transition to the login state
         * */
        vm.login = function(){
            //We go to the login state
            $state.go('authentication.signin');
        };
    }
}());
