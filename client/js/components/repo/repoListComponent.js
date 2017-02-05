(function () {
  angular.module('showroom').component('srRepoList', {
    templateUrl: 'client/views/components/repoList.html',
    bindings: {
      filters: '<'
    },
    controller: RepoListController
  });

  RepoListController.$inject = ['ReposService'];

  function RepoListController (reposService) {
    var vm = this;

    vm.$onInit = function () {
      reposService.getMostRecent().then(function (repos) {
        vm.repos = repos;
      });
    }
  }
})();