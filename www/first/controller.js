angular
  .module('smartcard.first.ctrl', [])
  /**
   *首页控制器
   */
  .controller('FirstCtrl', function($scope, $timeout, ionicToast,FirstServe,$state) {
      $scope.turnList=[]
      $scope.prePage = function(index) {
          
          if($scope.mid !==0) {
            $scope.mid = index-1
          }else {
            ionicToast.show('已经是第一张了哦')
            return
          }
          $scope.pre = true
          $scope.next = false
          $scope.turnFlag1 = index
      };
      $scope.nextPage = function(index) {
           if($scope.mid !==$scope.turnList.length-1) {
            $scope.mid = index+1
          }else {
            ionicToast.show('已经是最后一张了哦')
            return
          }
          $scope.pre = false
          $scope.next = true
          $scope.turnFlag = index
      };
      $scope.init = function(){
        FirstServe.findbyquery({userUuid:localStorage.getItem("userUuid"), status:1})
        .then( function(res){
                  if(res.code == 200) {
                      $scope.turnList = res.result.list
                      $scope.mid = 0
                  }
              })
      }
      $scope.init()
  })

  .controller('CardModelCtrl', function($scope, $timeout, ionicToast) {
    console.log('开始')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('安静点的')
    }
  })

  .controller('PersonalCardCtrl', function($scope, $timeout, ionicToast) {
    console.log('开始')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('安静点的')
    }
  })

  .controller('CompanyCardCtrl', function($scope, $timeout, ionicToast) {
    console.log('开始')
    var vm = ($scope.vm = this)
    $scope.go = function() {
      console.log('安静点的')
    }
  })

  .controller('AddCardCtrl', function(
    $scope,
    $timeout,
    ionicToast,
    $state,
    FirstServe
  ) {
    var vm = ($scope.vm = this)
    vm.form ={
    	username:'',
			position:'',
			phone:'',
			companName:'',
			companAdress:'',
			companSlogan:'',
			companBrand:'',
			business:'',
			email:'',
			brandLabel:'',
			companDesc:'',
			fax:''
    }
    $scope.labelList = []
    $scope.addlabel = function() {
    	if(vm.form.brandLabel.trim() !== '') {
    		const list = $scope.labelList
    		if(list.indexOf(vm.form.brandLabel.trim())!==-1) {
    				ionicToast.show('标签已存在不能重复')
    		}else {
    			$scope.labelList.push(vm.form.brandLabel.trim())
    		}

    	}else{
    		ionicToast.show('标签不能为空和空白')
    	}
    	vm.form.brandLabel=''
    }
    $scope.addcard = function() {
    	const param = {
    		userUuid:localStorage.getItem("userUuid"),
				userCname: vm.form.username,
				userEname: vm.form.username,
				position: vm.form.position,
				phone: vm.form.phone,
				telphone: vm.form.phone,
				companyCname: vm.form.companName,
				companyEname: vm.form.companName,
				companyCaddress: vm.form.companAdress,
				companyEaddress: vm.form.companAdress,
				companyCpor: vm.form.companSlogan,
				companyEpor: vm.form.companSlogan,
				companyMark: vm.form.companBrand,
				cardMark:$scope.labelList.join(','),
				fax: vm.form.fax,
				logoUrl: '/usr/local',
				business: vm.form.business,
				email: vm.form.email,
				cardType: 1,
    	}
    	FirstServe.addcardmessage(param).then(function(res) {
    		if(res.code == 200) {
    			ionicToast.show('添加成功')
    			$state.go('tab.first')
    		}else {
    			ionicToast.show('添加失败')
    		}
    	})
    }
    $scope.go = function() {
      console.log('安静点的')
    }
  })

  .controller('TabCtrl', function($scope, FirstServe) {
      var vm = ($scope.vm = this)
      vm.query = {
          userUuid:localStorage.getItem("userUuid"),
          status:1,
      }
      vm.selectTag = function(num) {
          vm.query.tag = num
          if (!vm.query.userUuid) return false;
              FirstServe.findbyquery({userUuid:vm.query.userUuid, status:vm.query.status}).
              then(function(res) {
                      console.log('查询名片', res.result.list);
                      // if (data.Status === 200) {
                      //     vm.query.data = res;
                      // }
                  });
      }
      // vm.selectTag()
      $scope.$on('$ionicView.beforeEnter', function() {
          vm.query.tag = false
      })
  })
