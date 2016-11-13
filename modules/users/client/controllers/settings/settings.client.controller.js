(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'AuthenticationService'];

  function SettingsController($scope, AuthenticationService) {
    var vm = this;

    vm.user = AuthenticationService.user;
  }
}());
