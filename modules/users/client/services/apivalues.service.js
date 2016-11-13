/**
 * Base service for the definition of the API endpoint connection values
 *
 * Created by Mauricio Lara on 6/15/16.
 */
'use strict';
(function(){

    angular.module('core')
        .constant('ApiValues', ApiValues());

    function ApiValues(){

        //Flag for the debug environment
        var isDebug = true; // TODO set a NODE_ENV variable

        var apiAddress = ( isDebug ? 'localhost' : 'api.fixin.com.mx');
        var apiPort = ( isDebug ? '3002' : '3443' );
        var connectionProtocol = ( isDebug ? 'http' : 'https' );
        var apiVersion = 1;
        var tokenRefreshMaxRetries = 3;

        /* definition of the API constants for the application */
        return {
            apiAddress : apiAddress,
            apiPort : apiPort,
            connectionProtocol : connectionProtocol,
            apiVersion : apiVersion,
            baseUrl: baseUrl(),
            serverAddress: serverAddress(),
            acceptHeader: getAcceptHeader(),
            buildAbsolutePath : buildAbsolutePath,
            buildAdminAbsolutePath : buildAdminAbsolutePath,
            tokenRefreshMaxRetries : tokenRefreshMaxRetries
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
         * Returns the accept header to be used for all the API requests
         * */
        function getAcceptHeader(){
            return 'application/vendor.api.fixin.com.mx; v' + apiVersion;
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