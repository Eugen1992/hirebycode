(function () {
  angular.module('showroom').component('repoDetails', {
    templateUrl: 'client/views/components/repoDetails.html',
    bindings: {
      repo: '<'
    }
  });
})();