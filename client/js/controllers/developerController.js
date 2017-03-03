(function () {
  angular.module('showroom').controller('DeveloperController', DeveloperController);
  DeveloperController.$inject = ['$scope', 'developer'];
  function DeveloperController (scope, developer) {
    scope.repos = developer.repos;
    scope.developerInfo = developer.info;
  }
})();