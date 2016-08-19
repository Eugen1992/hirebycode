var app = angular.module('showroom', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('/home', {
      url: "/",
      templateUrl: "client/views/partials/home.html",
      controller: "ImportController"
    })
});