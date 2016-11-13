(function () {
    'use strict';

    angular
        .module('legislation')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    /**
     * Function in charge of the configuration of the routes for the cities module
     * */
    function routeConfig($stateProvider) {


        /* we register the states associated with the cities */
        $stateProvider
            .state('legislations-list', {
                url: '/legislations',
                templateUrl: 'modules/legislations/client/views/legislations.list.view.html',
                controller: 'LegislationsController',
                controllerAs: 'vm'
            })
            .state('legislation-detail',{
                url: '/legislation/:legislation',
                templateUrl: 'modules/legislations/client/views/legislation.view.html',
                controller: 'LegislationDetailController',
                controllerAs: 'vm'
            });
    }

}());