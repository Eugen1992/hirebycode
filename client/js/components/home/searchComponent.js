(function () {
  angular.module('showroom').component('srSearch', {
    templateUrl: 'client/views/components/searchComponent.html',
    controller: SearchController
  });

  SearchController.$inject = ['$state', '$stateParams'];
  function SearchController ($state, $stateParams) {
    var vm = this;
    vm.$onInit = function () {
      vm.searchType = $stateParams.searchType || 'developers';
    };
    vm.changeSearchType = function (type) {
      vm.searchType = type;
      $state.go(
        $state.current.name, 
        angular.extend($state.params, { searchType: type })
      );
    };
  }
})();