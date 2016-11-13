(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(applicationConfigFunction);

  //Setting the dependencies for the configuration function
  applicationConfigFunction.$inject = ['$locationProvider', '$httpProvider', '$mdThemingProvider'];

  /**
   * Function in charge of the configuration of the modules of the web app
   * */
  function applicationConfigFunction($locationProvider, $httpProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    /* adding the auth interceptor at the application level */
    $httpProvider.interceptors.push('authInterceptor');

    /* setting the angular material custom theme */
    $mdThemingProvider.theme('default').primaryPalette('red');
  }

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));
