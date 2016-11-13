/**
 * Created by mauriciolara on 7/9/16.
 */
(function(){
    'use strict';

    angular
        .module('countries')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    /**
     * Function in charge of the configuration of the routes for the cities module
     * */
    function routeConfig($stateProvider) {
        /* we register the states associated with the cities */
        $stateProvider
            .state('country-list', {
                url: '/country',
                templateUrl: 'modules/countries/client/views/countries.client.view.html',
                controller: 'CountriesController',
                controllerAs: 'vm'
            })
            .state('country-detail',{
                url: '/country/:countryId',
                templateUrl: 'modules/countries/client/views/country.detail.client.view.html',
                controller: 'CountryDetailController',
                controllerAs: 'vm'
            });
    }

}());