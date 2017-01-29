HomeController.$inject = ['$scope', 'DeveloperService'];
angular.module('showroom').controller('HomeController',  HomeController);

function HomeController ($scope, developers) {
  developers.getActiveDevelopers().then(function (developers) {
    $scope.developers = developers;
  });
}