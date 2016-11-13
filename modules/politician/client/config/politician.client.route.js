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
            //.state('politician-list', {
            //    url: '/legislations',
            //    templateUrl: 'modules/politician/client/views/legislations.list.view.html',
            //    controller: 'LegislationsController',
            //    controllerAs: 'vm'
            //})
            .state('politician-detail',{
                url: '/politician/:id',
                templateUrl: 'modules/politician/client/views/politician.profile.view.html',
                controller: 'PoliticianController',
                controllerAs: 'vm'
            });
    }

}());