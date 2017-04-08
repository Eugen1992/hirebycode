(function () {
  angular.module('showroom').component('srSearchFilters', {
    templateUrl: 'client/views/components/searchFilters.html',
    controller: SearchFiltersController,
    bindings: {
      onLocationChange: '&',
      onSkillChange: '&',
      onSchoolChange: '&',
      skills: '<',
      schools: '<',
      locations: '<',
      filtersLoaded: '<',
      hiddenFilters: '<',
    }
  });

  function SearchFiltersController () {
    
  }
})();