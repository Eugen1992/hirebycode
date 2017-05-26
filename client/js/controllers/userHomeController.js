UserHomeController.$inject = ['UserReposService', '$filter', '$http', '$state'];
angular.module('showroom').controller('UserHomeController',  UserHomeController);

function UserHomeController (userRepos, filter, $http, $state) {
  var vm = this;
  
  vm.reposState = 'loading';
  getRepos();

  vm.import = function (repo) {
    $state.go('importing', {id: repo.id, name: repo.name, data: repo});
  }
  vm.openNotImported = function () {
    vm.notImportedOpened = true;
  }
  vm.deleteRepo = function (repoToDelete) {
    userRepos.delete({hbcId: repoToDelete._id})
      .then(function (repos) {
        getRepos();
      });
  }
  vm.hideRepo = function (repoToHide) {
    userRepos.hide({hbcId: repoToHide._id})
      .then(function () {
        getRepos();
      });
  }
  vm.unhideRepo = function (repoToHide) {
    userRepos.unhide({hbcId: repoToHide._id})
      .then(function () {
        getRepos();
      });
  }
  vm.editRepo = function (repo) {
    $state.go('edit', {id: repo._id});
  }
  
  function getRepos() {
    userRepos.getUserRepos()
      .then(function (repos) {
        handleRepos(repos);
        vm.notImportedOpened = vm.userImportedRepos.length === 0;
        vm.reposState = 'loaded';
      }, function () {
        vm.reposState = 'failed';
      });
  }
  function handleRepos(repos) {
    vm.userGithubRepos = repos.userGithubRepos.filter(function (repo) {
      return !repos.userImportedRepos.find(function (importedRepo) {
        return repo.id === importedRepo.providerId;
      });
    });
    vm.userImportedRepos = repos.userImportedRepos;
  }
}