angular.module('showroom').directive('srHighlight', function () {
  return {
    restrict: 'A',
    scope: {
      language: '@language'
    },
    controller: function ($scope, $element, $timeout) {
      hljs.highlightBlock($element[0]);
    }
  }
});