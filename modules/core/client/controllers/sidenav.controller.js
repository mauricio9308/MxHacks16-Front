(function () {
    'use strict';

    angular
        .module('core')
        .controller('SideNavController', SideNavController);

    //Adding the dependencies
    SideNavController.$inject = ['$scope', '$state', 'AuthenticationService', '$mdSidenav'];

    /**
     * Controller in charge of the handling of the operations of the Sidenav
     * */
    function SideNavController( $scope, $state, AuthenticationService, $mdSidenav ){
        var vm = this;
    }

}());
