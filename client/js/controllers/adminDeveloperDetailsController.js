(function() {
  angular.module('showroom').controller('AdminDeveloperDetailsController', AdminDeveloperDetailsController);

  AdminDeveloperDetailsController.$inject = ['$state', 'AdminDevelopersService'];
  function AdminDeveloperDetailsController ($state, AdminDevelopersService) {
    var vm = this;
    getDeveloper();

    function getDeveloper () {
      AdminDevelopersService.getDeveloperById($state.params.id).then(function (developer) {
        vm.info = developer.info;
        vm.repos = developer.repos;
      });
    }
  }
})();
