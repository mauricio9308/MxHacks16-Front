/**
 * Created by mauriciolara on 7/9/16.
 */
(function () {
    'use strict';

    angular
        .module('states')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    /**
     * Function in charge of the configuration of the routes for the states module
     * */
    function routeConfig($stateProvider) {

        /* we register the states associated with the states*/
        $stateProvider
            .state('state-list', {
                url: '/states?countryId',
                templateUrl: 'modules/states/client/views/states.client.view.html',
                controller: 'StatesController',
                controllerAs: 'vm'
            })
            .state('state-detail',{
                url: '/state/:stateId',
                templateUrl: 'modules/cities/client/views/state.detail.client.view.html',
                controller: 'StateDetailController',
                controllerAs: 'vm'
            });
    }

}());