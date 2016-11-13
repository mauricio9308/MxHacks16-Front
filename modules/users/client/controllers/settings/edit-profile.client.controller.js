(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'AuthenticationService'];

  function EditProfileController($scope, $http, $location, UsersService, AuthenticationService) {
    var vm = this;

    vm.user = AuthenticationService.user;
    vm.updateUserProfile = updateUserProfile;

    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        AuthenticationService.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
}());
