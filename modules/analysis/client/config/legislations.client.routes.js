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
        /* we register the states associated with the analysis */
        $stateProvider
            .state('create-analysis', {
                url: '/analysis/create/:legislation',
                templateUrl: 'modules/analysis/client/views/analysis.add.form.html',
                controller: 'UploadAnalysisController',
                controllerAs: 'vm'
            });
    }

}());