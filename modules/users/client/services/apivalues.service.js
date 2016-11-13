/**
 * Base service for the definition of the API endpoint connection values
 *
 */
'use strict';
(function(){

    angular.module('core')
        .constant('ApiValues', ApiValues());

    function ApiValues(){

        // Set of the api values
        var apiAddress = 'ec2-54-186-5-157.us-west-2.compute.amazonaws.com';
        var apiPort = '8080';
        var connectionProtocol = 'http';
        var apiVersion = 1;
        var tokenRefreshMaxRetries = 3;

        // Reference for the different type of users


        /* definition of the API constants for the application */
        return {
            apiAddress : apiAddress,
            apiPort : apiPort,
            connectionProtocol : connectionProtocol,
            apiVersion : apiVersion,
            baseUrl: baseUrl(),
            serverAddress: serverAddress(),
            buildAbsolutePath : buildAbsolutePath,
            buildAdminAbsolutePath : buildAdminAbsolutePath,
            tokenRefreshMaxRetries : tokenRefreshMaxRetries,
            USER_SUPER_ADMIN : 0,
            USER_LAWYER : 1,
            USER_CLIENT : 2
        };

        /**
         * Returns the base url for the API requests
         * */
        function baseUrl(){
            return connectionProtocol + '://' + apiAddress +
                ':' + apiPort + '/v' + apiVersion + '/';
        }

        /**
         * Returns the address of the server that holds the API
         * */
        function serverAddress(){
            return connectionProtocol + '://' + apiAddress +
                    ':' + apiPort;
        }

        /**
         * Builds the absolute path with the given relative path
         * */
        function buildAbsolutePath( relativePath ){
            return baseUrl() + relativePath;
        }

        /**
         * Builds the admin absolute path with the given relative path
         * */
        function buildAdminAbsolutePath( relativePath ){
            return baseUrl() + 'admin/' + relativePath;
        }

    }

}());