angular
  .module('smartcard.three.ctrl', [])
  /**
   *首页控制器
   */
  .controller('ThreeTabCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    }
    var self = this
    console.log('第三瓶')
  })
