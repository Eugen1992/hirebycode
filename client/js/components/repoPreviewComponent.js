(function () {
  angular.module('showroom').component('srRepoPreview', {
    templateUrl: 'client/views/components/repoPreview.html',
    bindings: {
      repo: '='
    },
    controller: function ($state) {
      this.seeDetails = function (id) {
        $state.go('repo-details', {id: id});
      }
    }
  });
})();