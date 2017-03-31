(function () {
  angular.module('showroom').directive('ga', factory);

  factory.$inject = ['Analytics'];
  function factory (analytics) {
    return {
      restrict: 'A',
      scope: {
        event: '=',
        eventCategory: '=',
        eventAction: '=',
        eventLabel: '='
      },
      link: function (scope, element) {
        element.bind(scope.event || 'click', function () {
          analytics.trackEvent(scope.eventCategory, scope.eventAction, scope.eventLabel);
        });
      }
    }
  }
}());