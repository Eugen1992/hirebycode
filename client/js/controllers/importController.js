ImportController.$inject = ['$scope', '$q', 'UserService', 'UserReposService', 'GithubRepoService', '$state', '$stateParams'];
angular.module('showroom').controller('ImportController',  ImportController);

function ImportController ($scope, $q, user, repos, githubRepos, $state, $stateParams) {
  var vm = this;
  vm.repoState = 'repoLoading';
  githubRepos.getByProviderId($stateParams.id).then(function (receivedRepo) {
    vm.repoState = 'repoLoaded';
    $scope.repo = receivedRepo;
    $scope.repo.hbcData = {
      skills: [],
      description: '',
      plans: '',
      contactInfo: ''
    };
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