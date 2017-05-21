(function () {
  angular.module('showroom').component('srPullRepoByLink', {
    templateUrl: 'client/views/components/repo/pullRepoByLink.html',
    bindings: {
      onPullSuccess: '&'
    },
    controller: PullRepoByLinkController
  });

  PullRepoByLinkController.$inject = ['$scope', 'GithubRepoService'];

  function PullRepoByLinkController ($scope, githubRepoService) {
    var vm = this;
    vm.link = '';
    vm.pullState = 'idle';
    vm.onSubmit = function () {
      vm.pullState = 'loading';
      githubRepoService.pullRepoByLink(vm.link)
        .then(function (repo) {
          vm.pullState = 'success';
          vm.onPullSuccess({ repo: repo });
        })
        .catch(function () {
          vm.pullState = 'error';
        });
    }
  }
})();