angular
    .module('smartcard.account.ctrl', [])
    .controller('LoginPhoneCtrl', function($scope, $timeout, $state, ionicToast, AccountServe) {
        var vm = ($scope.vm = this);
        vm.loginP = {
            phone:'',
            verifycode:''
        };

        vm.getCode = function() {
            if(!vm.loginP.phone){
                ionicToast.show('手机号码为空,请输入手机号', 'middle', false, 1500);
                return ;
            }
            AccountServe.getVerifyCode({phone:vm.loginP.phone}).then(
                function(res) {
                    if (res.code === 400) {
                        ionicToast.show('手机号码为空,请输入手机号', 'middle', false, 1500);
                        return;
                    } else if (res.code === 500) {
                        ionicToast.show(res.message, 'middle', false, 1500);
                        return;
                    } else if (res.code === 200) {
                        ionicToast.show('获取验证码成功', 'middle', false, 1500);
                    }
                });
        }

        vm.loginByPhone = function() {
            if(!vm.loginP.phone || !vm.loginP.verifycode) {
                ionicToast.show('手机号码或者验证码为空', 'middle', false, 1500);
                return ;
            }
            AccountServe.loginByPhoneCode({ phone:vm.loginP.phone, code:vm.loginP.verifycode}).then(
                function(res) {
                    if(res.code === 400 ) {
                        ionicToast.show('手机号码或者验证码为空', 'middle', false, 1500);
                        return ;
                    } else if (res.code === 500) {
                        ionicToast.show(res.message, 'middle', false, 1500);
                        return ;
                    } else if(res.code === 200) {
                        vm.query = res.result;
                        localStorage.setItem("token", res.token);
                        localStorage.setItem("userId", res.userId);
                        localStorage.setItem("userUuid", res.userUuid);
                        $state.go('tab.first');
                    }
                });
        };
    })

    .controller('LoginPwdCtrl', function($scope, $timeout, $state, ionicToast, AccountServe) {
        var vm = ($scope.vm = this);
        vm.login = {
            username:'',
            password:''
        };
        vm.loginByUserAndPwd = function() {
            if (!vm.login.username || !vm.login.password){
                ionicToast.show('用户名和密码为空', 'middle', false, 1500);
                return ;
            }
            AccountServe.loginByUserAndPwd({ username: vm.login.username, password:vm.login.password}).then(
                function(res) {
                    if(res.code === 500){
                        console.log(res);
                        ionicToast.show(res.message, 'middle', false, 1500);
                    }
                    else if (res.code === 200) {
                        vm.query = res.result;
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("userUuid", res.userUuid);
                        $state.go('tab.first');
                    }
                });
        };
    })

    .controller('RegisterPhoneCtrl', function($scope, $timeout, $state, ionicToast, AccountServe) {
        var vm = ($scope.vm = this);
        vm.register = {
            phone:'',
            verifyCode:'',
            password:'',
            confirmPwd:'',
        };

        vm.getCode = function() {
            if(!vm.register.phone){
                ionicToast.show('您输入的手机号为空，请检查后输入', 'middle', false, 1500);
                return ;
            }
            AccountServe.getVerifyCode({phone:vm.register.phone}).then(
                function(res) {
                    if (res.code === 400) {
                        ionicToast.show('您输入的手机号为空，请检查后输入', 'middle', false, 1500);
                        return;
                    } else if (res.code === 500) {
                        ionicToast.show(res.message, 'middle', false, 1500);
                        return;
                    } else if (res.code === 200) {
                        localStorage.setItem("vcode", res.result);
                        ionicToast.show('获取验证码成功', 'middle', false, 1500);
                    }
                });
        };

        vm.registerInfo = function () {
            if(!vm.register.password || !vm.register.confirmPwd || !vm.register.phone || !vm.register.verifyCode){
                ionicToast.show('参数为空，请检查后输入', 'middle', false, 1500);
                return ;
            } else {
                if(vm.register.password !== vm.register.confirmPwd) {
                    ionicToast.show('两次输入的密码不一样，请检查', 'middle', false, 1500);
                    return ;
                } else {
                    //if(vm.register.verifyCode === localStorage.getItem("vcode")){
                        localStorage.setItem("password", vm.register.password);
                        localStorage.setItem("phone", vm.register.phone);
                        localStorage.setItem("verifyCode", vm.register.verifyCode);
                        $state.go('registerCard');
                   // } else {
                       // ionicToast.show('您输入的验证码有误', 'middle', false, 1500);
                      //  return ;
                   // }
                }
            }
        };
    })

    //RegisterCardCtrl
    .controller('RegisterCardCtrl', function($scope, $timeout, $state, ionicToast, AccountServe) {
        var vm = ($scope.vm = this);
        vm.registerCtrl = {
            realName:'',
            position:'',
            companyName:'',
            personalMark:''
        };

        vm.enterCard = function() {
            if(!vm.registerCtrl.realName || !vm.registerCtrl.position || !vm.registerCtrl.companyName || !vm.registerCtrl.personalMark){
                ionicToast.show('参数为空，请检查后输入', 'middle', false, 1500);
                return ;
            }
            AccountServe.registerInfoToCard(
                {code:localStorage.getItem("verifyCode"), username:vm.registerCtrl.realName, password:localStorage.getItem("password"),
                    phone:localStorage.getItem("phone"), weichat:'1',
                    email:'1', qq:'1'}).then(
                function(res) {
                    if (res.code === 400) {
                        ionicToast.show('参数为空，请重新输入', 'middle', false, 1500);
                        return ;
                    } else if (res.code === 500) {
                        ionicToast.show(res.message, 'middle', false, 1500);
                        return ;
                    } else if (res.code === 200) {
                        ionicToast.show('注册成功', 'middle', false, 1500);
                        localStorage.setItem("userUuid", res.result.userUuid)
                        const param = {
                            userUuid:res.result.userUuid,
                            userCname: vm.registerCtrl.realName,
                            userEname: '未知',
                            position: vm.registerCtrl.position,
                            phone: localStorage.getItem("phone"),
                            telphone: '未知',
                            companyCname: vm.registerCtrl.companyName,
                            companyEname: '未知',
                            companyCaddress: '未知',
                            companyEaddress: '未知',
                            companyCpor: '未知',
                            companyEpor: '未知',
                            companyMark: '未知',
                            cardMark:'未知',
                            fax: '未知',
                            logoUrl: res.result.imgurl,
                            business: vm.registerCtrl.personalMark,
                            email: '未知',
                            cardType: 1,
                        }
                        AccountServe.addCardMessage(param).then(
                            function(res) {
                                console.log("添加名片信息 = "+ JSON.stringify(res))
                                if (res.code === 400) {
                                    ionicToast.show('参数为空，请重新输入', 'middle', false, 1500);
                                    return ;
                                } else if (res.code === 500) {
                                    ionicToast.show(res.message, 'middle', false, 1500);
                                    return ;
                                } else if (res.code === 200) {
                                    $state.go('tab.first');
                                }
                            }
                        );
                    }
                });
        };
    })
