(function () {
  angular.module('showroom').component('srSearchFiltersIndicator', {
    templateUrl: 'client/views/components/searchFiltersIndicator.html',
    controller: SearchFiltersIndicatorController,
    bindings: {
      filters: '<',
      onRemove: '&'
    }
  });

  function SearchFiltersIndicatorController ($state) {
    var vm = this;
  }
})();