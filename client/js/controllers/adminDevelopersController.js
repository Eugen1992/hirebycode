(function() {
  angular.module('showroom').controller('AdminDevelopersController', AdminDevelopersController);

  AdminDevelopersController.$inject = ['$scope', '$state', 'AdminDevelopersService'];
  function AdminDevelopersController ($scope, $state, AdminDevelopersService) {
    var vm = this;
    getDevelopers();

    function getDevelopers () {
      AdminDevelopersService.getDevelopers().then(function (developers) {
        vm.developers = developers;
      });
    }
  }
})();