(function () {
  angular.module('showroom').component('srSearchToggle', {
    templateUrl: 'client/views/components/searchToggleComponent.html',
    controller: SearchToggleController,
    bindings: {
      onToggle: '&',
      searchType: '<'
    }
  });

  SearchToggleController.$inject = ['$state']
  function SearchToggleController ($state) {

  }
})();