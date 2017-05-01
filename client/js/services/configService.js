(function () {
  app.service('ConfigService', ConfigService);

  ConfigService.$inject = ['$window'];

  function ConfigService ($window) {
    var env = $window.env;
    this.googleCaptchaKey = 
      env === 'production' 
        ? '6LfRkhkUAAAAAIcAzLUEKxmBGu_e8Xb3MIOjh2RH'
        : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  }
})();