(function () {
    'use strict';

    angular.module('legislation')
        .factory('LegislationService', LegislationService);

    //Declaring the service dependencies
    LegislationService.$inject = ['$q', '$http', 'ApiValues', 'ValidationHelper'];

    function LegislationService($q, $http, ApiValues, ValidationHelper) {
        //Public API

        return {
            getLegislation: getLegislation,
            getLegislations: getLegislations,
            createLegislation: createLegislation,
            deleteLegislation: deleteLegislation,
            createLegislationComment: createLegislationComment,
            createLegislationAnalysis : createLegislationAnalysis,
            sendComment : sendComment,
            listLegislationComments :listLegislationComments,
            listLegislationAnalysis : listLegislationAnalysis,
            addNegativeVote : addNegativeVote,
            addPositiveVote : addPositiveVote
        };

        /**
         * Adds a vote
         * */
        function addPositiveVote( legislation ){
            var legislationVotePositiveDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('legislation/' + legislation + '/vote/positive');

            /* obtaining the list of the legislation */
            $http.post(path)
                .then(function (response) {
                    console.log('Vote');

                    /* success getting the list of the legislation comments  */
                    legislationVotePositiveDefer.resolve();
                }).catch(function (errorResponse) {
                /* error getting the list of legislation comments */
                legislationVotePositiveDefer.reject(errorResponse.data);
            });

            return legislationVotePositiveDefer.promise;
        }

        /**
         * Adds a negative vote
         * */
        function addNegativeVote( legislation ){
            var legislationVotePositiveDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('legislation/' + legislation + '/vote/positive');

            /* obtaining the list of the legislation */
            $http.post(path)
                .then(function (response) {
                    /* success getting the list of the legislation comments  */
                    legislationVotePositiveDefer.resolve();
                }).catch(function (errorResponse) {
                /* error getting the list of legislation comments */
                legislationVotePositiveDefer.reject(errorResponse.data);
            });

            return legislationVotePositiveDefer.promise;
        }

        /**
         * Obtains the comments of a given legislation
         * */
        function listLegislationComments( legislation ){
            var legislationCommentsListDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('comments/' + legislation );

            /* obtaining the list of the legislation */
            $http.get(path)
                .then(function (response) {
                    /* success getting the list of the legislation comments  */
                    legislationCommentsListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the list of legislation comments */
                legislationCommentsListDefer.reject(errorResponse.data);
            });

            return legislationCommentsListDefer.promise;
        }

        /**
         * Obtains the analysis of a given legislation
         * */
        function listLegislationAnalysis( legislation ){
            var legislationAnalysisListDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('analysis/' + legislation );

            /* obtaining the list of the legislation analysis */
            $http.get(path)
                .then(function (response) {
                    /* success getting the list of the legislation comments  */
                    legislationAnalysisListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the list of legislation comments */
                legislationAnalysisListDefer.reject(errorResponse.data);
            });

            return legislationAnalysisListDefer.promise;
        }

        /**
         * Send a comments of a given legislation
         * */
        function sendComment( legislation, comment ){
            // Sending a new comment
            var sendCommentsListDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('comments/' + legislation );

            /* obtaining the list of the legislation */
            $http.post(path, { legislation : legislation, text: comment })
                .then(function (response) {
                    /* success getting the list of the legislation comments  */
                    sendCommentsListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the list of legislation comments */
                sendCommentsListDefer.reject(errorResponse.data);
            });

            return sendCommentsListDefer.promise;
        }

        /**
         * Adds a new legislation review
         * */
        function createLegislationComment(text, legislation) {
            //Creating the defer object
            var legislationCommentCreationDefer = $q.defer();

            /* we verify the incoming object */
            if (!text || !legislation) {
                legislationCommentCreationDefer.reject('No proporcionaste la información suficiente');
                return legislationCommentCreationDefer.promise;
            }

            /* we validate the provided information */
            if (!ValidationHelper.isString(text) ) {
                legislationCommentCreationDefer.reject('Por favor valida el tipo de información dada');
                return legislationCommentCreationDefer.promise;
            }

            /* we build the object for the item creation  */
            var newItem = {
                text: text
            };

            /* we make the create item petition */
            $http.post(ApiValues.buildAbsolutePath('comments/' + legislation), newItem)
                .then(function (response) {
                    /* success creating the new item */
                    console.debug(JSON.stringify(response.data));

                    //We return the new created item via the defer
                    legislationCommentCreationDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error creating the item  */
                console.error('Error creating the item in the server');
                console.error(JSON.stringify(errorResponse.data));

                // return of the item error
                legislationCommentCreationDefer.reject(errorResponse.data);
            });

            // promise return
            return legislationCommentCreationDefer.promise;
        }

        /**
         * Adds a new legislation review
         * */
        function createLegislationAnalysis(text, legislation) {
            //Creating the defer object
            var legislationAnalysisCreationDefer = $q.defer();

            /* we verify the incoming object */
            if (!text || !legislation) {
                legislationAnalysisCreationDefer.reject('No proporcionaste la información suficiente');
                return legislationAnalysisCreationDefer.promise;
            }

            /* we validate the provided information */
            if (!ValidationHelper.isString(text) ) {
                legislationAnalysisCreationDefer.reject('Por favor valida el tipo de información dada');
                return legislationAnalysisCreationDefer.promise;
            }

            /* we build the object for the item creation  */
            var newItem = {
                text: text
            };

            /* we make the create item petition */
            $http.post(ApiValues.buildAbsolutePath('analysis/' + legislation), newItem)
                .then(function (response) {
                    /* success creating the new item */
                    console.debug(JSON.stringify(response.data));

                    //We return the new created item via the defer
                    legislationAnalysisCreationDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error creating the item  */
                console.error('Error creating the item in the server');
                console.error(JSON.stringify(errorResponse.data));

                // return of the item error
                legislationAnalysisCreationDefer.reject(errorResponse.data);
            });

            // promise return
            return legislationAnalysisCreationDefer.promise;
        }


        /**
         * Deletes a legislation from the server
         * */
        function deleteLegislation( legislationToDelete ){
            // Promise for the delete of the item
            var legislationDeleteDefer = $q.defer();

            /* we make the create state petition */
            $http.delete(ApiValues.buildAbsolutePath('legislation/' + legislationToDelete) )
                .then(function (response) {
                    /* success deleting the new item */
                    console.debug(JSON.stringify(response.data));

                    //We return the new created item via the defer
                    legislationDeleteDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                    /* error creating the item  */
                    console.error('Error deleting the item in the server');
                    console.error(JSON.stringify(errorResponse.data));

                    // return of the item error
                    legislationDeleteDefer.reject(errorResponse.data);
            });

            // promise return
            return legislationDeleteDefer.promise;
        }

        /**
         * Creates a new legislation
         * */
        function createLegislation(legislationInformation) {
            //Creating the defer object
            var legislationCreationDefer = $q.defer();

            /* we verify the incoming object */
            if (!legislationInformation || !legislationInformation.name || !legislationInformation.text
                || !legislationInformation.politicians) {
                legislationCreationDefer.reject('No proporcionaste la información suficiente');
                return legislationCreationDefer.promise;
            }

            /* we validate the provided information */
            if (!ValidationHelper.isString(legislationInformation.name) || !ValidationHelper.isString(legislationInformation.text) || !ValidationHelper.isString(legislationInformation.politicians)) {
                legislationCreationDefer.reject('Por favor valida el tipo de información dada');
                return legislationCreationDefer.promise;
            }

            /* we build the object for the item creation  */
            var newItem = {
                name: legislationInformation.name,
                text: legislationInformation.text,
                politicians: legislationInformation.politicians
            };

            /* we make the create item petition */
            $http.post(ApiValues.buildAbsolutePath('legislation/lawyer'), newItem)
                .then(function (response) {
                    /* success creating the new item */
                    console.debug(JSON.stringify(response.data));

                    //We return the new created item via the defer
                    legislationCreationDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                    /* error creating the item  */
                    console.error('Error creating the item in the server');
                    console.error(JSON.stringify(errorResponse.data));

                    // return of the item error
                    legislationCreationDefer.reject(errorResponse.data);
                });

            // promise return
            return legislationCreationDefer.promise;
        }

        /**
         * Obtains a certain legislation item items available in the server
         * */
        function getLegislation(legislation) {
            var legislationListDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('legislation');

            /* obtaining the list of the legislation */
            $http.get(path)
                .then(function (response) {
                    /* success getting the list of the legislation */
                    legislationListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the list of legislations */
                legislationListDefer.reject(errorResponse.data);
            });

            return legislationListDefer.promise;
        }

        /**
         * Obtains the current list of the legislation items available in the server
         * */
        function getLegislations() {
            var legislationListDefer = $q.defer();

            // Build of the legislation path
            var path = ApiValues.buildAbsolutePath('legislation');

            /* obtaining the list of the legislation */
            $http.get(path)
                .then(function (response) {
                    /* success getting the list of the legislation */
                    legislationListDefer.resolve(response.data);
                }).catch(function (errorResponse) {
                /* error getting the list of legislations */
                legislationListDefer.reject(errorResponse.data);
            });

            return legislationListDefer.promise;
        }




    }

}());