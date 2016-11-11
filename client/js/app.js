var app = angular.module('showroom', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "client/views/partials/home.html",
      controller: "HomeController"
    })
    .state('authorized', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('user-home', {
      parent: 'authorized',
      url: "/account",
      templateUrl: "client/views/partials/userHome.html",
      controller: "UserHomeController"
    })
    .state('importing', {
      parent: 'authorized',
      url: "/import/:id",
      templateUrl: "client/views/partials/importing.html",
      controller: "ImportController",
      params: {name: '', data: {}}
    })
    .state('edit', {
      parent: 'authorized',
      url: "/edit/:id",
      templateUrl: "client/views/partials/edit.html",
      controller: "EditController",
      params: {name: '', data: {}}
    })
    .state('github-login', {
      url: '/github-login',
      templateUrl: "client/views/partials/githubLogin.html",
      controller: "GithubLoginController"
    });

  $httpProvider.interceptors.push('ApiInterceptorService');
});

angular.module('showroom').run(function($rootScope, $state, UserService){
  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    if (to.parent === 'authorized' && !UserService.isLoggedIn()) {
        ev.preventDefault();
        $state.go('home');
    }
  });
});