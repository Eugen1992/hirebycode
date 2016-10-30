var app = angular.module('showroom', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('/home', {
      url: "/",
      templateUrl: "client/views/partials/home.html",
      controller: "HomeController"
    })
    .state('/user-home', {
      url: "/account",
      templateUrl: "client/views/partials/userHome.html",
      controller: "UserHomeController"
    })
    .state('/importing', {
      url: "/importing/:id",
      templateUrl: "client/views/partials/importing.html",
      controller: "ImportController",
      params: {name: '', data: {}}
    
    })
    .state('/github-login', {
      url: '/github-login',
      templateUrl: "client/views/partials/githubLogin.html",
      controller: "GithubLoginController"
    });
  
  $httpProvider.interceptors.push('ApiInterceptorService');
});