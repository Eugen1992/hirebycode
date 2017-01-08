
angular.module('showroom').directive('srFileContent', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/views/directives/file-content.html',
    scope: {
      language: '@language',
      content: '='
    },
    link: function ($scope, $element) {
      $scope.$watch('content', function() {
        hljs.highlightBlock($element[0]);
        hljs.lineNumbersBlock($element[0].getElementsByTagName('code')[0]);
     });
      
    }
  }
});