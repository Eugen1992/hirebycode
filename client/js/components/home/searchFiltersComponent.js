(function () {
  angular.module('showroom').component('srSearchFilters', {
    templateUrl: 'client/views/components/searchFilters.html',
    controller: SearchFiltersController,
    bindings: {
      onLocationChange: '&',
      onSkillChange: '&',
      onSchoolChange: '&'
    }
  });

  SearchFiltersController.$inject = ['SkillsService'];
  function SearchFiltersController (skills) {
    var vm = this;

    vm.$onInit = function () {
      skills.getSkills().then(function (skills) {
        vm.skills = skills;
      });
    }
  }
})();