var app = angular.module('showroom', ['ui.router', 'ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/views/partials/home.html',
      controller: 'HomeController'
    })
    .state('repo-details', {
      url: '/repo-details/:id?projectPath',
      templateUrl: 'client/views/partials/repoDetails.html',
      controller: 'RepoDetailsController',
      resolve: {
        repo: function (ReposService, $stateParams, $q) {
          return ReposService.getRepoByHbcId($stateParams.id);
        }
      }
    })
    .state('developer', {
      url: '/developer/:id',
      templateUrl: 'client/views/partials/developerDetails.html',
      controller: 'DeveloperController',
      resolve: {
        developer: function (DeveloperService, $stateParams) {
          return DeveloperService.getDeveloperById($stateParams.id);
        }
      }
    })
    .state('authorized', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('account', {
      parent: 'authorized',
      url: '/account',
    })
    .state('user-home', {
      parent: 'authorized',
      url: '/user-home',
      templateUrl: 'client/views/partials/userHome.html',
      controller: 'UserHomeController'
    })
    .state('training-center-home', {
      parent: 'authorized',
      url: '/training-center-home',
      templateUrl: 'client/views/partials/trainingCenterHome.html',
      controller: 'TrainingCenterHomeController'
    })
    .state('importing', {
      parent: 'authorized',
      url: '/import/:id',
      templateUrl: 'client/views/partials/importing.html',
      controller: 'ImportController',
      params: {name: '', data: {}}
    })
    .state('edit', {
      parent: 'authorized',
      url: '/edit/:id',
      templateUrl: 'client/views/partials/edit.html',
      controller: 'EditController',
      resolve: {
        repo: function (UserReposService, $stateParams, $q) {
          return UserReposService.getRepoByHbcId($stateParams.id);
        }
      }
    })
    .state('edit-preview', {
      parent: 'authorized',
      url: '/edit/:id/preview',
      templateUrl: 'client/views/partials/editPreview.html',
      controller: 'EditController',
      resolve: {
        repo: function (UserReposService, $stateParams, $q) {
          return UserReposService.getRepoByHbcId($stateParams.id);
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/views/partials/login.html',
      controller: 'LoginController'
    })
    .state('github-login', {
      url: '/github-login',
      templateUrl: 'client/views/partials/githubLogin.html',
      controller: 'GithubLoginController'
    })
    .state('training-center-login', {
      url: '/training-center-login',
      templateUrl: 'client/views/partials/trainingCenterLogin.html',
      controller: 'TrainingCenterLoginController'
    });

  $httpProvider.interceptors.push('ApiInterceptorService');
});

angular.module('showroom').run(function($rootScope, $state, UserLocalService){
  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    if (to.parent === 'authorized' && !UserLocalService.isLoggedIn()) {
        ev.preventDefault();
        $state.go('home');
    }
  });
  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    if (to.name === 'account') {
      ev.preventDefault();
      switch (UserLocalService.getUser().type) {
        case 'trainingCenter':
          $state.go('training-center-home');
          break;
        case 'developer':
          $state.go('user-home');
          break;
        default:
          $state.go('home');
      }
    }
  });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    console.log(event);
    console.log(error);
  });
});