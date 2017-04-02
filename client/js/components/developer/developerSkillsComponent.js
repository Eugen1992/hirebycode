(function () {
  angular.module('showroom').component('srDeveloperSkills', {
    templateUrl: 'client/views/components/developer/developerSkills.html',
    bindings: {
      skills: '<'
    }
  });
})();