(function () {
    'use strict';

    angular
        .module('cities')
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
                templateUrl: 'modules/cities/client/views/cities.client.view.html',
                controller: 'CitiesController',
                controllerAs: 'vm'
            })
            .state('legislation-detail',{
                url: '/city/:legislation',
                templateUrl: 'modules/cities/client/views/city.detail.client.view.html',
                controller: 'CityDetailController',
                controllerAs: 'vm'
            });
    }

}());