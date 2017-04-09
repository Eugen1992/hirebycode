(function () {
  angular.module('showroom').component('srSearch', {
    templateUrl: 'client/views/components/search.html',
    controller: SearchController,
    bindings: {
      predefinedFilters: '<',
      hiddenFilters: '<',
      header: '<',
    }
  });

  SearchController.$inject = ['$q', '$state','$stateParams', 'FiltersService', 'SkillsService', 'TrainingCentersService', 'Analytics'];
  function SearchController ($q, $state, $stateParams, filtersService,  skills, trainingCenters, analyticsProvider) {
    var vm = this;

    vm.$onInit = function () {
      vm.hiddenFilters = angular.merge({
        skill: false,
        school: false,
        location: false,
      }, vm.hiddenFilters);
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
          return filtersService.addPredefinedFilters(vm.predefinedFilters);
        })
        .then(function (filters) {
          filters.flattenFilters = filters.flattenFilters.filter(function (filter) {
            return vm.hiddenFilters[filter.type] === false;
          });
          vm.filters = angular.extend({}, filters);
        });
    };

    vm.loadFiltersLists = function () {
      return filtersService.loadFiltersLists().then(function (filtersLists) {
        vm.skillsList = filtersLists.skills;
        vm.schoolsList = filtersLists.schools;
        vm.locationsList = filtersLists.locations;

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
        vm.filters = angular.extend({}, newFilters);
        console.log('adding school');
        analyticsProvider.trackEvent('filtering', 'school', school.name);
        vm.updateState();
      });
    };

    vm.addLocationToFilters = function (location) {
      filtersService.addLocationToFilters(location).then(function(newFilters) {
        vm.filters = angular.extend({}, newFilters);
        vm.updateState();
      });
    };

    vm.updateState = function () {
      var newParams = {
        searchType: vm.searchType,
        skillFilter: Object.keys(vm.filters.skill).join(),
        schoolFilter: (vm.filters.school && !vm.hiddenFilters.school) ? vm.filters.school._id : null,
        locationFilter: (vm.filters.location && !vm.hiddenFilters.location) ? vm.filters.location._id : null
      };
      $state.go(
        $state.current.name,
        angular.extend($state.params, newParams),
        {notify: false}
      );
    }
  }
})();