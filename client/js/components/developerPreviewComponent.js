(function () {
  angular.module('showroom').component('srDeveloperPreview', {
    templateUrl: 'client/views/components/developerPreview.html',
    bindings: {
      developer: '='
    },
    controller: function ($state) {
      this.seeDetails = function (id) {
        $state.go('repo-details', {id: id});
      }
    }
  });
})();