(function () {
  app.service('AnalyticService', AnalyticService);

  AnalyticService.$inject = ['$http'];

  function AnalyticService ($http) {
    
    this.sendEvent = function (data) {

    }
  }
})();