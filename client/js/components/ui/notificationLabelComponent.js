(function () {
  angular.module('showroom').component('srNotificationLabel', {
    templateUrl: 'client/views/components/ui/notificationLabel.html',
    bindings: {
      headerText: '<',
      text: '<',
      isOpen: '<',
      onClose: '&',
      mode: '<',
      noCloseButton: '<',
    },
    controller: NotificationLabelController
  });

  function NotificationLabelController () {
    this.defaultHeaders = {
      error: 'Opps...',
      success: 'Done'
    };
    this.defaultTexts = {
      error: 'Something went wrong. Please try again or contact us',
      sucess: ''
    }
  }
})();