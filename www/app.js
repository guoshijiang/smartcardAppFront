// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular
  .module('starter', [
    'ionic',
    // 'ngCordova',
    'starter.controllers',
    'starter.services',
    'ionic-toast',
    'smartcard.router',
    'smartcard.first.ctrl',
    'smartcard.two.ctrl',
    'smartcard.three.ctrl',
    'smartcard.four.ctrl',
    'rsc.development.config',
      'smartcard.account.ctrl'
    // 'restangular',
  ])

  .run(function($ionicPlatform) {
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
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault()
      }
    })
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
    //$ionicConfigProvider.views.transition('none');
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
