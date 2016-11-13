/**
 * Created by mauriciolara on 7/8/16.
 */
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
            .state('city-list', {
                url: '/cities',
                templateUrl: 'modules/cities/client/views/cities.client.view.html',
                controller: 'CitiesController',
                controllerAs: 'vm'
            })
            .state('city-detail',{
                url: '/city/:cityId',
                templateUrl: 'modules/cities/client/views/city.detail.client.view.html',
                controller: 'CityDetailController',
                controllerAs: 'vm'
            });
    }

}());