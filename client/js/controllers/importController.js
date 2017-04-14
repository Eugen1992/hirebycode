ImportController.$inject = ['$scope', '$q', 'UserService', 'UserReposService', '$state', '$stateParams'];
angular.module('showroom').controller('ImportController',  ImportController);

function ImportController ($scope, $q, user, repos, $state, $stateParams) {
  var vm = this;
  vm.repoState = 'repoLoading';
  repos.getByProviderId($stateParams.id).then(function (receivedRepo) {
    //vm.repoState = 'repoLoaded';
    //$scope.repo = receivedRepo;
    /*$scope.repo.hbcData = {
      languages: [],
      description: '',
      plans: '',
      contactInfo: ''
    };*/
  });
  $scope.submit = function () {
    $q.all([user.fetchDeveloperDetails(), repos.import($scope.repo)])
    .then(function (responses) {
      var userDetails = responses[0];
      if (userDetails.profileReadyForPublic) {
        $state.go('user-home');
      } else {
        $state.go('edit-developer-profile');
      }
      
    });

  }
}