(function () {
  angular.module('showroom').controller('editDeveloperProfileController', EditDeveloperProfileController);

  EditDeveloperProfileController.$inject = ['$scope', 'UserService'];

  function EditDeveloperProfileController ($scope, userService) {
    var vm = this;
    vm.state = 'idle';
    $scope.autocompleteOptions = {types: ['(cities)']};
    userService.fetchDeveloperDetails().then(function (info) {
      handleUserInfo(info);
    });
    $scope.submit = function () {
      vm.state = 'loading';
      userService.updateDeveloperDetails($scope.info)
        .then(function(userInfo) {
          vm.state = 'success';
          handleUserInfo(userInfo);
        }, function () {
          vm.state = 'error';
          $scope.error = true;
        });
    }

    function handleUserInfo (info) {
      $scope.info = info;
      $scope.location = info.city + ', ' + info.country;
    }
  }
})();