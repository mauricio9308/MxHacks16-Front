(function () {
    'use strict';

    angular
        .module('core')
        .controller('HeaderController', HeaderController);

    //Adding the dependencies to the controller
    HeaderController.$inject = ['$scope', '$state', 'CurrentSessionService', '$mdSidenav', '$rootScope',
        'AuthenticationService'];

    function HeaderController($scope, $state, CurrentSessionService, $mdSidenav, $rootScope, AuthenticationService) {
        var vm = this;
        vm.isUserLoggedIn = CurrentSessionService.isUserLoggedIn();

        //We listen to the state changes for collapsing the toolbar
        $scope.$on('$stateChangeSuccess', function () {
            var sidebar = $mdSidenav('main-sidebar');
            if( sidebar.isOpen() ){
                sidebar.close()
            }
        });

        /* we listen to the session updates */
        $rootScope.$on('UserSessionUpdate', function(){
            vm.isUserLoggedIn = CurrentSessionService.isUserLoggedIn();
        });


        /**
         * toggles the main sections sidebar
         * */
        vm.toggleSectionsSidebar = function () {
            if( vm.isUserLoggedIn ){
                $mdSidenav('main-sidebar').toggle();
            }
        };


        /**
         * Transitions to the login form state
         * */
        vm.goToLogin = function () {
            //We go to the login state
            $state.go('authentication.signin');
        };

        /**
         * Starts the logout process
         * */
        vm.logout = function(){
            console.log('logout called');

            // Sync call for the logout service
            AuthenticationService.logout();

            //We update the reference for the session update
            $rootScope.$broadcast('UserSessionUpdate');

            // We proceed to go to the home state of the application
            $state.go('home');
        };

    }
}());
