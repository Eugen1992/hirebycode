(function () {
  angular.module('showroom').service('UserService', UserService);

  UserService.$inject = ['$http', '$q', 'Upload', 'UserLocalService', 'Analytics'];
  function UserService ($http, $q, upload, userLocal, analytics) {
    var userData;
    var developerFetched = false;
    var trainingCenterFetched = false;

    this.fetchTrainingCenterDetails = function () {
      if (trainingCenterFetched) {
        return $q(function (resolve) {
          resolve(userData);
        });
      } else {
        return $http.get('/api/user/training-center/details').then(function(response) {
          userData = response.data;
          trainingCenterFetched = true;
          return userData;
       });
      }
    }
    this.fetchDeveloperDetails = function () {
      if (developerFetched) {
        return $q(function (resolve) {
          resolve(userData);
        });
      } else {
        return $http.get('/api/user/developer/details').then(function(response) {
          userData = response.data;
          developerFetched = true;
          return userData;
        });
      }
    }
    this.updateDeveloperDetails = function (data) {
      return $http({
        method: 'PUT',
        url: 'api/user/developer/details',
        data: data
      }).then(function(response) {
        userData = response.data;
        return userData;
      }, function (error) {
        return error;
      });
    }
    this.updateDeveloperAvatar = function (avatar) {
      return upload.upload({
        url: 'api/user/developer/avatar',
        method: 'PUT',
        data: { userImage: avatar }
      }).then(function(response) {
        analytics.trackEvent('Developer', 'Upload avatar', 'success');
        userData.avatar = response.data.avatar;
        return userData;
      }, function (error) {
        analytics.trackEvent('Developer', 'Upload avatar', 'error', error.status);
        return $q.reject(error);
      });
    }
    this.updateDeveloperAccountStatus = function (params) {
      var hidden = params.hidden;
      return $http.put('api/user/developer/account-status', params).then(function () {
        userData.hidden = hidden;
      });
    }
    this.updateTrainingCenterAccountStatus = function (params) {
      return $http.put('api/user/training-center/account-status', params);
    }
    this.updateTrainingCenterDetails = function (data, logo) {
      if (logo) {
        data.userImage = logo; 
      }
      return upload.upload({
        url: 'api/user/training-center/details',
        method: 'PUT',
        data: data
      }).then(function(response) {
        userLocal.setUser(response.data);
        return response.data;
      }, function (error) {
        console.log(error);
      });
    }
  }
})();