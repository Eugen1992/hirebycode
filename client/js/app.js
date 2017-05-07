var app = angular.module('showroom', [
  'ui.router', 
  'ui.select', 
  'ngSanitize', 
  'ngFileUpload', 
  'vsGoogleAutocomplete',
  'ngImgCrop',
  'vcRecaptcha',
  'angular-google-analytics',
  'ngTagsInput'
]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/?searchType&skillFilter&schoolFilter&locationFilter',
      templateUrl: 'client/views/partials/home.html',
      controller: 'HomeController'
    })
    .state('how-it-works', {
      url: '/how-it-works',
      templateUrl: 'client/views/partials/howItWorks.html'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'client/views/partials/search.html'
    })
    .state('repo-details', {
      url: '/repo-details/:id?contentPath&contentType',
      templateUrl: 'client/views/partials/repo.html',
      controller: 'RepoController',
      resolve: {
        repo: function (ReposService, $stateParams, $q) {
          return ReposService.getRepoByHbcId($stateParams.id);
        }
      }
    })
    .state('developer', {
      url: '/developer/:id',
      templateUrl: 'client/views/partials/developer.html',
      controller: 'DeveloperController',
      controllerAs: '$ctrl',
      resolve: {
        developer: function (DeveloperService, $stateParams) {
          return DeveloperService.getDeveloperById($stateParams.id);
        }
      }
    })
    .state('training-center', {
      url: '/school/:id?searchType&skillFilter&schoolFilter&locationFilter',
      templateUrl: 'client/views/partials/trainingCenter.html',
      controller: 'TrainingCenterController',
      controllerAs: '$ctrl',
      resolve: {
        trainingCenter: function (TrainingCentersService, $stateParams) {
          return TrainingCentersService.getTrainingCenterDetailsById($stateParams.id);
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
      controller: 'UserHomeController',
      controllerAs: '$ctrl',
    })
    .state('verify-email', {
      url: '/verify-email/:token',
      redirectTo: 'verification-result',
    })
    .state('verification-result', {
      parent: 'authorized',
      url: '/verification-result',
      templateUrl: 'client/views/partials/verificationResult.html',
      controller: 'VerificationResultController',
      controllerAs: '$ctrl',
    })
    .state('edit-developer-profile', {
      parent: 'authorized',
      url: '/edit-developer-profile?isInitial',
      templateUrl: 'client/views/partials/editDeveloperProfile.html',
      controller: 'editDeveloperProfileController',
      controllerAs: '$ctrl'
    })
    .state('training-center-home', {
      parent: 'authorized',
      url: '/training-center-home',
      templateUrl: 'client/views/partials/trainingCenterHome.html',
      controller: 'TrainingCenterHomeController',
      controllerAs: '$ctrl'
    })
    .state('importing', {
      parent: 'authorized',
      url: '/import/:id',
      templateUrl: 'client/views/partials/importing.html',
      controller: 'ImportController',
      controllerAs: '$ctrl',
      params: {name: '', data: {}}
    })
    .state('edit', {
      parent: 'authorized',
      url: '/edit/:id?contentPath&contentType',
      templateUrl: 'client/views/partials/edit.html',
      controller: 'EditController',
      controllerAs: '$ctrl',
      resolve: {
        repo: function (UserReposService, $stateParams, $q) {
          return UserReposService.getRepoToEdit($stateParams.id);
        }
      }
    })
    .state('edit-preview', {
      parent: 'authorized',
      url: '/edit/:id/preview?contentPath&contentType',
      templateUrl: 'client/views/partials/editPreview.html',
      controller: 'EditController',
      resolve: {
        repo: function (UserReposService, $stateParams, $q) {
          return UserReposService.getRepoToEdit($stateParams.id);
        }
      }
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
    })
    .state('admin', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('admin-login', {
      url: '/admin-login',
      templateUrl: 'client/views/partials/admin/admin-login.html',
      controller: 'AdminLoginController'
    })
    .state('admin-skills', {
      url: '/admin-skills',
      controllerAs: '$ctrl',
      templateUrl: 'client/views/partials/admin/admin-skills.html',
      controller: 'AdminSkillsController'
    })
    .state('admin-training-centers', {
      url: '/admin-training-centers',
      controllerAs: '$ctrl',
      templateUrl: 'client/views/partials/admin/admin-training-centers.html',
      controller: 'AdminTrainingCentersController'
    })
    .state('admin-training-center-details', {
      url: '/admin-training-centers/:id',
      controllerAs: '$ctrl',
      templateUrl: 'client/views/partials/admin/admin-training-center-details.html',
      controller: 'AdminTrainingCenterDetailsController'
    })
    .state('admin-developers', {
      url: '/admin-developers',
      controllerAs: '$ctrl',
      templateUrl: 'client/views/partials/admin/admin-developers.html',
      controller: 'AdminDevelopersController'
    })
    .state('admin-developer-details', {
      url: '/admin-developer-details/:id',
      controllerAs: '$ctrl',
      templateUrl: 'client/views/partials/admin/admin-developer-details.html',
      controller: 'AdminDeveloperDetailsController'
    })
    .state('admin-panel', {
      parent: 'admin',
      url: '/admin-panel',
      templateUrl: 'client/views/partials/admin/admin-panel.html',
      controller: 'AdminPanelController'
    });

  $httpProvider.interceptors.push('ApiInterceptorService');
});

angular.module('showroom').config(['AnalyticsProvider', function (AnalyticsProvider) {
  AnalyticsProvider.setAccount('UA-94102105-1');
}]).run(['Analytics', function(Analytics) { }]);

angular.module('showroom').run(function($rootScope, $state, UserLocalService) {
  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    if (to.parent === 'authorized' && !UserLocalService.isLoggedIn()) {
        ev.preventDefault();
        $state.go('home');
    } 
    if (to.parent === 'admin' && !UserLocalService.isAdmin()) {
      ev.preventDefault();
      $state.go('home');
    }
  });
  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    if (to.redirectTo) {
      ev.preventDefault();
      $state.go(to.redirectTo, toParams, { location: 'replace' });
      return;
    }
    if (to.name === 'account') {
      ev.preventDefault();
      switch (UserLocalService.getUser().type) {
        case 'trainingCenter':
          $state.go('training-center-home');
          break;
        case 'developer':
          $state.go('user-home');
          break;
        case 'admin':
          $state.go('admin-panel');
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