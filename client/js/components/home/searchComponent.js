(function () {
  angular.module('showroom').component('srSearch', {
    templateUrl: 'client/views/components/search.html',
    controller: SearchController
  });

  SearchController.$inject = ['$q', '$state','$stateParams', 'FiltersService', 'SkillsService', 'TrainingCentersService'];
  function SearchController ($q, $state, $stateParams, filtersService,  skills, trainingCenters) {
    var vm = this;

    vm.$onInit = function () {
      vm.searchType = $stateParams.searchType || 'developers';
      vm.filters = {
        skill: {},
        school: {},
        location: {},
        flattenFilters: []
      };

      vm.loadFiltersLists()
        .then(function () {
          return filtersService.createFiltersFromState($stateParams);
        })
        .then(function (filters) {
          vm.filters = filters;
        });
    };
    vm.loadFiltersLists = function () {
      return filtersService.loadFiltersLists().then(function (filtersLists) {
        vm.skillsList = filtersLists.skills;
        vm.schoolsList = filtersLists.schools;
        return filtersLists;
      });
    };

    vm.changeSearchType = function (type) {
      vm.searchType = type;

      vm.updateState();
    };

    vm.removeFilter = function (filter) {
      filtersService.removeFilter(filter).then(function (newFilters) {
        vm.filters = angular.extend({}, newFilters);
        vm.updateState();
      });
    }

    vm.addSkillToFilters = function (skill) {
      filtersService.addSkillToFilters(skill).then(function(newFilters) {
        vm.filters = angular.extend({}, newFilters);
        vm.updateState();
      });
    };

    vm.addSchoolToFilters = function (school) {
      filtersService.addSchoolToFilters(school).then(function(newFilters) {
        console.log(newFilters);
        vm.filters = angular.extend({}, newFilters);
        vm.updateState();
      });
    };
    vm.updateState = function () {
      var newParams = {
        searchType: vm.searchType,
        skillFilter: Object.keys(vm.filters.skill).join()
      };
      $state.go(
        $state.current.name,
        angular.extend($state.params, newParams),
        {notify: false}
      );
    }
  }
})();