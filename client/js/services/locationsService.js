(function() {
  LocationsService.$inject = ['$http', '$q'];
  app.service('LocationsService', LocationsService);

  function LocationsService ($http, $q) {
    var locations, fetched;
    this.getLocations = function () {
      if (fetched) {
        return $q(function (resolve, reject) {
          resolve(locations);
        })
      } else {
        return $http.get('api/location').then(function (response) {
          fetched = true;
          locations = response.data;
          return locations;
        });
      }
    };
  }
})();