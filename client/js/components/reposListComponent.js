(function () {
  angular.module('showroom').component('reposList', {
    templateUrl: 'client/views/components/reposList.html',
    bindings: {
      repos: '='
    },
    controller: function ($state) {
      this.seeDetails = function (id) {
        $state.go('repo-details', {id: id});
      }
    }
  });
})();