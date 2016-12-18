ApiInterceptorService.$inject = ['$q', '$rootScope', 'UserService'];
app.service('ApiInterceptorService', ApiInterceptorService);

function ApiInterceptorService ($q, $rootScope, userService) {
    var service = this;
    service.request = function(config) {
        var token = userService.getToken();
        if (config.url.indexOf('github') !== -1) {
            return config;
        }
        if (token && !config.headers.authorization) {
            config.headers.authorization = token;
        }
        return config;
    };
    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return $q.reject(response);
    };
}