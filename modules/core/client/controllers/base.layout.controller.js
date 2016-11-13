'use strict';
(function(){

    angular.module('core')
        .controller('BaseLayoutController', BaseLayoutController);

    //adding the dependencies
    BaseLayoutController.$inject = ['CurrentSessionService', 'ApiValues'];

    function BaseLayoutController( CurrentSessionService, ApiValues ){
        //Setting the controller reference
        var vm = this;
        vm.isUserLoggedIn = CurrentSessionService.isUserLoggedIn();
        vm.isUserAdmin = CurrentSessionService.getUserType() == ApiValues.USER_SUPER_ADMIN;
        vm.isUserLawyer = CurrentSessionService.getUserType() == ApiValues.USER_LAWYER;
        vm.isUserClient = CurrentSessionService.getUserType() == ApiValues.USER_CLIENT;
    }
}());