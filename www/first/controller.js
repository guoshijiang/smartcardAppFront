angular
  .module('smartcard.first.ctrl', [])
  /**
   *首页控制器
   */
  .controller('FirstCtrl', function($scope, $timeout, ionicToast,FirstServe,$state,$ionicActionSheet) {
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
              });
      }
      $scope.init()
      $scope.addMyMing = function(){
        var hideSheet = null,
          buttons = [{ text: '<i class="text-center">手动添加名片</i>' },
                    { text: '<i class="text-center">扫描纸质名片</i>' }];
        hideSheet = $ionicActionSheet.show({
          buttons: buttons,
          // destructiveText: 'Delete',
          // titleText: '上传图片',
          cancelText: '取消',
          cancel: function () {
              // add cancel code..
              hideSheet();
          },
          buttonClicked: function (index) {
              switch (index) {
				  case 0:
				  	  hide();
				  	  $state.go('tab.addCard')
                      break;
                  case 1:
                      break;
                  case 2:
                      hide();
                      break;
                  default:
                      break;
              }
          }
      })
      }
  })

    .controller('PersonInfoCtrl', function($scope, $timeout, $state, ionicToast) {
        var vm = ($scope.vm = this);
        vm.personInfo = {
            name:'',
            position:'',
            phone:'',
            email:'',
            cardMark:''
        };
        vm.commitPersonInfo = function () {
            if (!vm.personInfo.name) {
                ionicToast.show('您的用户名为空,请检查并输入', 'middle', false, 1500);
                return ;
            }
            if(!vm.personInfo.position ) {
                ionicToast.show('您的职位为空,请检查并输入', 'middle', false, 1500);
                return ;
            }
            if(!vm.personInfo.phone) {
                ionicToast.show('您的手机号为空,请检查并输入', 'middle', false, 1500);
                return ;
            }
            if(!vm.personInfo.email) {
                ionicToast.show('您的邮件为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if(!vm.personInfo.cardMark){
                ionicToast.show('您的个人标签为空,请检查并输入', 'middle', false, 1500);
                return ;
            }
            localStorage.setItem("pName", vm.personInfo.name);
            localStorage.setItem("pPosition", vm.personInfo.position);
            localStorage.setItem("pPhone", vm.personInfo.phone);
            localStorage.setItem("pEmail", vm.personInfo.email);
            localStorage.setItem("pCardMark",vm.personInfo.cardMark);
            $state.go('tab.companyInfo');
        };
    })

    .controller('CompanyInfoCtrl', function($scope, $timeout, $state, ionicToast) {
        var vm = ($scope.vm = this);
        vm.companyInfo = {
            companyName:'',
            companyAddress:'',
            companyTel:'',
            companyFax:'',
            companyBusiness:'',
            companyMark:'',
            companyPro:''
        };
        vm.commitConpanyInfo = function () {
            if(!vm.companyInfo.companyName) {
                ionicToast.show('您输入的公司的名字为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if (!vm.companyInfo.companyAddress) {
                ionicToast.show('您输入的公司的地址为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if (!vm.companyInfo.companyTel) {
                ionicToast.show('您输入的公司的电话为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if (!vm.companyInfo.companyFax) {
                ionicToast.show('您输入的公司的传真为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if (!vm.companyInfo.companyBusiness) {
                ionicToast.show('您输入的公司的业务为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if (!vm.companyInfo.companyMark) {
                ionicToast.show('您输入的公司的标签为空,请检查并输入', 'middle', false, 1500);
                return ;
            }

            if (!vm.companyInfo.companyPro) {
                ionicToast.show('您输入的公司的简介为空,请检查并输入', 'middle', false, 1500);
                return ;
            }
            localStorage.setItem("pCompanyName", vm.companyInfo.companyName);
            localStorage.setItem("pCompanyAddress", vm.companyInfo.companyAddress);
            localStorage.setItem("pCompanyTel", vm.companyInfo.companyTel);
            localStorage.setItem("pCompanyFax", vm.companyInfo.companyFax);
            localStorage.setItem("pCompanyBusiness", vm.companyInfo.companyBusiness);
            localStorage.setItem("pCompanyMark", vm.companyInfo.companyMark);
            localStorage.setItem("pCompanyPro", vm.companyInfo.companyPro);
            $state.go('tab.addCard');

        };
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
    				ionicToast.show('标签已存在不能重复');
    		}else {
    			$scope.labelList.push(vm.form.brandLabel.trim())
    		}

    	}else{
    		ionicToast.show('标签不能为空和空白');
    	}
    	vm.form.brandLabel='';
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
