angular
  .module('smartcard.two.ctrl', [])
    .controller('TwoTabCtrl', function($scope, $timeout, TwoServe) {
        var vm = ($scope.vm = this)
        vm.query = {
            userId:localStorage.getItem("userId"),
            status:1,
            page:1,
            pageSize:6,
            data:[],
            isLoading:true,
            hasMore:true
        };
        vm.findMkeepByUserid = function() {
            TwoServe.findMkeepByUserid({userId:vm.query.userId, status:vm.query.status,
                page:vm.query.page, pageSize:vm.query.pageSize}).
            then(function(res) {
                if (res.code === 200) {
                    vm.hasMore = res.result.list.length < 6 ? false : true;
                    vm.query.data = vm.query.data.concat(res.result.list)
                    vm.query.isLoading = false;
                }
            })
            .finally(function() {
                vm.query.isLoading = false;
            });
        };

        $scope.doRefresh = function() {
            vm.query = {
                userId:10,
                status:1,
                page:1,
                pageSize:6,
                data:[],
                isLoading:true,
                hasMore:true
            }
            vm.findMkeepByUserid()
            $timeout(function() {
                $scope.$broadcast('scroll.refreshComplete');
            }, 300);
        };

        vm.loadMore = function() {
            vm.query.page += 1
            vm.findMkeepByUserid()
            $timeout(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete')
            }, 300);
        };

        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.doRefresh();
        });
    })

    .controller('DetailCtrl', function($scope, $stateParams, TwoServe) {
        var vm = ($scope.vm = this)
        vm.init = function() {
            if ($stateParams.id === 0) return false
            TwoServe.findMkeepById({ id: $stateParams.id }).then(
                function(res) {
                    if (res.code === 200) {
                        vm.query = res.result;
                    }
                });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            vm.init();
        });
    })

  .controller('InterpesonSearchCtrl', function($scope, $timeout, TwoServe) {
      var vm = ($scope.vm = this);
      vm.query = {
          page:1,
          pageSize:6,
          tag:'',
          mKeepMark:'',
          dataList:[],
          hasMore:true
      };
      vm.queryMankeepKeyWord = function() {
          if (!vm.query.mKeepMark) {
              vm.query.dataList = [];
              return false;
          }
          TwoServe.searchMkeepByKeyword({
              page:vm.query.page,
              pageSize:vm.query.pageSize,
              companyMark: vm.query.mKeepMark,
              business: vm.query.mKeepMark,
              cardMark:vm.query.mKeepMark,
          }).then(function(res) {
              if (res.code === 200) {
                      vm.query.tag = 2
                      if(res.result.list.length === 0){
                          vm.query.dataList = [];
                      }
                      vm.hasMore = res.result.list.length < 6 ? false : true;
                      vm.query.dataList = vm.query.dataList.concat(res.result.list);
                  }
              });
      };

      vm.loadMore = function() {
          vm.query.page += 1
          vm.queryMankeepKeyWord()
          $timeout(function() {
              $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 300);
      };

      $scope.$on('$ionicView.beforeEnter', function() {
          vm.query.tag = 1;
      });
  })

	.controller('searchResultCtrl',function($scope, $stateParams, TwoServe) {
        var vm = ($scope.vm = this)
        vm.init = function() {
            if ($stateParams.id === 0) return false
            TwoServe.searchMkeepDetail({ id:$stateParams.id }).then(
                function(res) {
                    if (res.code === 200) {
                        vm.query = res.result;
                    }
                });
        };
        $scope.$on('$ionicView.beforeEnter', function() {
            vm.init();
        });
	});
