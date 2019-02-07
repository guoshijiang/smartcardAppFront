// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular
  .module('starter', [
    'ionic',
    'ngCordova',
    'starter.controllers',
    'starter.services',
    'ionic-toast',
    'smartcard.router',
    'smartcard.first.ctrl',
    'smartcard.two.ctrl',
    'smartcard.three.ctrl',
    'smartcard.four.ctrl',
    'ion.ionBottomSheet',
    'rsc.development.config',
    'rsc.service.common.bak',
    'smartcard.account.ctrl',
    
    'rsc.service.common',
    'rsc.service.phone',
	  'rsc.common.directives',
	  'monospaced.qrcode'
  ])
  .value('AppVersion', '1.0.0')
  .run(function(
    $ionicPlatform,
    $rootScope,
    $log,
    Storage,
    ionicToast,
    $ionicHistory,
    $ionicViewSwitcher,
    $filter,
    $state,
    $cordovaDevice,
    $q,
    $cordovaStatusbar,
    // EventRegister, 获取当前联系人通讯录
    // MsgServiceAngular,
	$location,
	$cordovaBarcodeScanner
  ) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (
        window.cordova &&
        window.cordova.plugins &&
        window.cordova.plugins.Keyboard
      ) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        ionic.Platform.showStatusBar(true)
        if (window.StatusBar) {
          StatusBar.show()
        }
      }
	})
	if(ionic.Platform.isWebView()){
		// if (ionic.Platform.platform() == 'android') {
		// 	StatusBar.backgroundColorByHexString("#354bb1");
		// }else{
		// 	$cordovaStatusbar.overlaysWebView(false);
		// 	$cordovaStatusbar.style(1);
		// 	StatusBar.styleLightContent();
		// 	$cordovaStatusbar.styleColor('black');
		// }
	}
	
	

    $rootScope.$state = $state
    $rootScope.Platform = ionic.Platform
    $rootScope.$on('$stateChangeSuccess', function(
      event,
      toState,
      roParams,
      fromState,
      fromParams
    ) {
		if(!Storage.get('userInfo').token){//没有token
			if(arguments[1].name && arguments[1].name.indexOf('tab')!=-1){//tab.
				$state.go('loginPwd')
				// return false;
			}
		}else{
			if(arguments[1].name && arguments[1].name=='loginPwd'){//
				$state.go('tab.first')
				// return false;
			}
		}
		$log.debug('$stateChangeSuccess', arguments)
    })

    $rootScope.$on('$stateChangeError', function(
      event,
      toState,
      roParams,
      fromState,
      fromParams,
      error
    ) {
      $log.error('$stateChangeError', error)
      switch (error.msg) {
        case 'no_login':
          //未登录
          	$state.go('loginPwd')
          	break
        case 'logined':
          	//已经登录，根据角色跳转对应的页面
	        $state.go('tab.first')
		  	break
		default :
			$state.go('tab.first')
			break
      }
    })

    $rootScope.$on('$stateChangeStart', function(
      event,
      toState,
      roParams,
      fromState,
      fromParams
    ) {
	  
	  $log.debug('$stateChangeStart', arguments,)
    })


    //返回上一级历史记录
    // $rootScope.GoBack = function() {
    //   $log.debug('rootGoBack', $ionicHistory)
    //   $ionicHistory.goBack()
    //   $ionicViewSwitcher.nextDirection('back')
    // }
    // $rootScope.goRoute = function(route, id) {
    //   $state.go(router, { id: id })
    //   $ionicViewSwitcher.nextDirection('back')
    // }
    //图片的路径
	// $rootScope.imgUrl = 'http://www.zgxnjz.cn'
	//扫一扫
	$rootScope.rscScan = function () {
		var scanConfig = {
			preferFrontCamera: false, // iOS and Android
			showFlipCameraButton: true, // iOS and Android
			showTorchButton: true, // iOS and Android
			torchOn: false, // Android, launch with the torch switched on (if available)
			prompt: "扫一扫", // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
			orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations: true, // iOS
			disableSuccessBeep: false // iOS
		}
		console.log('uu')
		return $cordovaBarcodeScanner.scan(scanConfig)
			.then(function (result) {
				if (result.text != '') {
					alert(result.text)
					// var data = result.text.split("&")
					// if (!data[2]) {
					// 	data[2] = 'TRAFFIC_DRIVER_PRIVATE'
					// }
					// $rootScope.rootGoDetail(data[2], data[1])
				}
			}, null)
	}


  })


  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function() {
          scope.$watch(attributes.hideTabs, function(value) {
            $rootScope.hideTabs = value
          })
        })
        // console.log('smdkAlert',smdkAlert)
        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false
        })
      }
    }
  })
  .config(function(
    $provide,
    $stateProvider,
    $urlRouterProvider,
    // RestangularProvider,
    // ENV,
    // $httpProvider,
    $ionicConfigProvider
    // ionicTimePickerProvider,
    // ionicDatePickerProvider
  ) {
    // RestangularProvider.setBaseUrl(ENV.api.account)
    // $httpProvider.interceptors.push('AuthInterceptor')
    // android 导航底部配置
    $ionicConfigProvider.platform.ios.tabs.style('standard')
    $ionicConfigProvider.platform.ios.tabs.position('bottom')
    $ionicConfigProvider.platform.android.tabs.style('standard')
    $ionicConfigProvider.platform.android.tabs.position('standard')

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center')
    $ionicConfigProvider.platform.android.navBar.alignTitle('center')

    $ionicConfigProvider.platform.ios.backButton
      .previousTitleText('')
      .icon('ion-ios-arrow-thin-left')
    $ionicConfigProvider.platform.android.backButton
      .previousTitleText('')
      .icon('ion-android-arrow-back')

    $ionicConfigProvider.platform.ios.views.transition('ios')
    $ionicConfigProvider.platform.android.views.transition('ios')

    // $ionicConfigProvider.views.swipeBackEnabled(false);
    // $ionicConfigProvider.views.transition('none');
    //全局禁用页面缓存
    // $ionicConfigProvider.views.maxCache(0);
    // android 导航底部配置结束
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/login');
  })
