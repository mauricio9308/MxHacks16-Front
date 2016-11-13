/**
 * Created by Mauricio Lara on 7/8/16.
 */
(function (app) {
    'use strict';

    //We register the module in charge of the countries operations
    app.registerModule('countries', ['ui.router', 'core']);
}(ApplicationConfiguration));