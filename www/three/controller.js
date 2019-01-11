angular
  .module('smartcard.three.ctrl', [])
  /**
   *首页控制器
   */
  .controller('ThreeTabCtrl', function($scope, $state) {
    var vm = ($scope.vm = this)
    vm.dele = {
      tab: 'shangye'
    }
    vm.changeTag = function(type) {
      vm.dele.tab = type
    }
    $scope.settings = {
      enableFriends: true
    }
    var self = this

    $scope.go = function() {
      console.log('点击')
    }
  })

  .controller('commercialCtrl', function($scope) {
    console.log('商业动态')
  })
  .controller('businessCardCtrl', function($scope) {
    console.log('名片动态')
  })
  .controller('customerInfoCtrl', function($scope) {
    console.log('导入客户资料')
  })
  // .controller('DtDetailCtrl', function($scope) {
  //   console.log('详细资料')
  // })
  .controller('queryInfoCtrl', function($scope) {
    console.log('查询资料');
  })


