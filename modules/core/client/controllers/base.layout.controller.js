/**
 * Created by mauriciolara on 6/16/16.
 */
'use strict';
(function(){

    angular.module('core')
        .controller('BaseLayoutController', BaseLayoutController);

    //adding the dependencies
    BaseLayoutController.$inject = ['CurrentSessionService'];

    function BaseLayoutController( CurrentSessionService ){
        //Setting the controller reference
        var vm = this;
        vm.isUserLoggedIn = CurrentSessionService.isUserLoggedIn();
    }
}());