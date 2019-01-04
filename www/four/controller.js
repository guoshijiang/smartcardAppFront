angular
  .module('smartcard.four.ctrl', [])
  /**
   *首页控制器
   */
  .controller('FourTabCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    }
    var self = this
    console.log('第四瓶')
  })

  .controller('ReconmentCtrl', function (
    $scope,
    $timeout,
    ionicToast
  ) {
    console.log('推荐下载')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('推荐下载')
    }
  })

  .controller('SetupCtrl', function (
    $scope,
    $timeout,
    ionicToast
  ) {
    console.log('设置')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('设置')
    }
  })

//FeedBackCtrl
  .controller('FeedBackCtrl', function (
    $scope,
    $timeout,
    ionicToast
  ) {
    console.log('设置')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('设置')
    }
  })

  .controller('AuthCompanyCtrl', function (
    $scope,
    $timeout,
    ionicToast
  ) {
    console.log('设置')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('设置')
    }
  })

  .controller('AuthCompanyTwoCtrl', function (
    $scope,
    $timeout,
    ionicToast
  ) {
    console.log('设置')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('设置')
    }
  })

    .controller('HelpCtrl', function($scope, FourServe) {
        var vm = ($scope.vm = this)
        vm.query = {
          data:null, dateTime:''
        }
        vm.findHelpInfo = function() {
            FourServe.findbyquery({}).
            then(function(res) {
                if (res.code === 200) {
                    vm.query.data = res.result;
                }
            });
        }
        vm.findHelpInfo();
        $scope.$on('$ionicView.beforeEnter', function() {
            vm.findHelpInfo();
        })
    })

    .controller('HelpDetailCtrl', function($scope, $stateParams, FourServe) {
        var vm = ($scope.vm = this)
        vm.init = function() {
            if ($stateParams.id === 0) return false
            FourServe.findHelpContentById({ id: $stateParams.id }).then(
                function(res) {
                    if (res.code == 200) {
                        var strhp = res.result.helpContent;
                        console.log("strhp =" + strhp)
                        vm.query = strhp.split(/[；;:：]/);
                        vm.query.Title = vm.query[0]
                        vm.query.Content = [];
                        for(var  i =0; i < vm.query.length; i++) {
                          vm.query.Content[i] = vm.query[i + 1]
                        }
                    }
                }
            )
        }
        $scope.$on('$ionicView.beforeEnter', function() {
            vm.init()
        })
    })

    .controller('AboatCtrl', function (
        $scope,
        $timeout,
        ionicToast
    ) {
        console.log('关于')
        var vm = ($scope.vm = this)
        $scope.go = function() {
            console.log('关于')
        }
    })

    //企业查询相关的接口调用
    .controller('QueryCompanyCtrl', function($scope, ThreeServe) {
        var vm = ($scope.vm = this)
        vm.query = {
            tag: '',
            companyName: '',
            data: null
        }
        vm.selectTag = function(num) {
            vm.query.tag = num
            if (!vm.query.companyName) return false
            if (num == 2) {
                ThreeServe.getCompanyBoss({ companyName: vm.query.companyName }).then(
                    function(res) {
                        var data = JSON.parse(res.result)
                        console.log('查询企业老板', data)
                        if (data.Status == 200) {
                            vm.query.data = data
                        }
                    }
                )
            } else if (num == 1) {
                ThreeServe.getCompanyDetail({ companyName: vm.query.companyName }).then(
                    function(res) {
                        var data = JSON.parse(res.result)
                        console.log('查询企业', data)
                        if (data.Status == 200) {
                            vm.query.data = data
                        }
                    }
                )
            }
        }

        vm.queryCom = function(e) {
            if (!e) return false
            ThreeServe.getCompanyDetail({ companyName: e }).then(function(res) {
                var data = JSON.parse(res.result)
                console.log('查询企业信息', data)
                if (data.status == 200) {
                }
            })
        }

        vm.queryComByKeyWord = function(e) {
            vm.query.tag = 5
            if (!vm.query.companyName) return false
            ThreeServe.getCompanyBykeyWord({
                companyName: vm.query.companyName
            }).then(function(res) {
                var data = JSON.parse(res.result)
                if (data.Status == 200) {
                    vm.query.data = data.Result
                } else if (data.Status == '201') {
                    vm.query.data = data.Result
                }
            })
        }
        $scope.$on('$ionicView.beforeEnter', function() {
            vm.query.tag = false
        })
    })

    .controller('DtDetailCtrl', function($scope, $stateParams, ThreeServe) {
        var vm = ($scope.vm = this)
        vm.init = function() {
            if (!$stateParams.name) return false
            ThreeServe.getCompanyDetail({ companyName: $stateParams.name }).then(
                function(res) {
                    var data = JSON.parse(res.result)
                    if (data.Status == 200) {
                        console.log(data.Result);
                        vm.query = data.Result;
                        console.log(vm.query)
                    }
                }
            )
        }
        $scope.$on('$ionicView.beforeEnter', function() {
            vm.init();
            vm.query = null
        })
    })


