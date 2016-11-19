angular.module('showroom').directive('srHighlight', function () {
  return {
    restrict: 'A',
    scope: {
      language: '@language'
    },
    controller: function ($scope, $element, $timeout) {
      $timeout(function () {
        hljs.highlightBlock($element[0]);
      }, 500);
    }
  }
});