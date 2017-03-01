(function () {
  angular.module('showroom').controller('DeveloperController', DeveloperController);
  DeveloperController.$inject = ['$scope', 'developer'];
  function DeveloperController (scope, developer) {
    console.log(developer);
    scope.repos = developer.repos;
    scope.developerInfo = developer.info;
  }
})();