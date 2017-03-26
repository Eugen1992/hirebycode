(function () {
  angular.module('showroom').controller('DeveloperController', DeveloperController);
  DeveloperController.$inject = ['$scope', 'developer', 'AnalyticService'];
  function DeveloperController (scope, developer, analyticService) {
    var vm = this;
    vm.repos = developer.repos;
    vm.developer = developer.info;
  }
})();