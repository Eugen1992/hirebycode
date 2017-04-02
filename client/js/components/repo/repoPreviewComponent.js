(function () {
  angular.module('showroom').component('srRepoPreview', {
    templateUrl: 'client/views/components/repoPreview.html',
    transclude: true,
    bindings: {
      repo: '<',
      hideAuthorName: '<',
      mode: '<',
      onHide: '&',
      onUnhide: '&',
      onDelete: '&',
      onEdit: '&'
    },
    controller: RepoPreviewController
  });

  RepoPreviewController.$inject = ['$state', 'UserReposService'];
  function RepoPreviewController ($state, userRepos) {
    this.seeDetails = function (id) {
      $state.go('repo-details', {id: id});
    }
  }
})();