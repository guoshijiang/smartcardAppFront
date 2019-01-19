/**
 * 所有的文件的路由在此配置
 */
angular.module('smartcard.router', ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      // setup an abstract state for the tabs directive
      .state('account', {
          url: '/loginPhone',
          templateUrl: 'account/templates/loginPhone.html',
          controller: 'LoginPhoneCtrl'
      })

      .state('loginPwd', {
          url: '/loginPwd',
          templateUrl: 'account/templates/loginPwd.html',
          controller: 'LoginPwdCtrl'
      })

      .state('registerPhone', {
        url: '/registerPhone',
        templateUrl: 'account/templates/registerPhone.html',
        controller: 'RegisterPhoneCtrl'
    })

        .state('registerCard', {
            url: '/registerCard',
            templateUrl: 'account/templates/registerCard.html',
            controller: 'RegisterCardCtrl'
        })

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
      })

      //第一个模块
      .state('tab.first', {
        url: '/first',
        views: {
          'tab-first': {
            templateUrl: 'first/templates/first.html',
            controller: 'FirstCtrl'
          }
        }
      })
      .state('tab.cardModel', {
        url: '/cardModel',
        views: {
          'tab-first': {
            templateUrl: 'first/templates/cardModel.html',
            controller: 'CardModelCtrl'
          }
        }
      })

      .state('tab.personalCard', {
        url: '/personalCard',
        views: {
          'tab-first': {
            templateUrl: 'first/templates/personalCard.html',
            controller: 'PersonalCardCtrl'
          }
        }
      })

      .state('tab.companyCard', {
        url: '/companyCard',
        views: {
          'tab-first': {
            templateUrl: 'first/templates/companyCard.html',
            controller: 'CompanyCardCtrl'
          }
        }
      })

      .state('tab.addCard', {
        url: '/addCard',
        views: {
          'tab-first': {
            templateUrl: 'first/templates/addCard.html',
            controller: 'AddCardCtrl'
          }
        }
      })

      //第二个模块
      .state('tab.two', {
        url: '/two',
        views: {
          'tab-two': {
            templateUrl: 'two/templates/twoTab.html',
            controller: 'TwoTabCtrl'
          }
        }
      })

      .state('tab.detail', {
        url: '/detail/:id',
        views: {
          'tab-two': {
            templateUrl: 'two/templates/detail.html',
            controller: 'DetailCtrl'
          }
        }
      })

      .state('tab.interpesonSearch', {
        url: '/interpesonSearch',
        views: {
          'tab-two': {
            templateUrl: 'two/templates/interpesonSearch.html',
            controller: 'InterpesonSearchCtrl'
          }
        }
      })

      .state('tab.searchResult', {
        url: '/searchResult/:id',
        views: {
          'tab-two': {
            templateUrl: 'two/templates/searchResult.html',
            controller: 'searchResultCtrl'
          }
        },
        params: { searchParam: '' }
      })
      //第三个模块
      .state('tab.three', {
        url: '/three',
        views: {
          'tab-three': {
            templateUrl: 'three/templates/three.html',
            controller: 'ThreeTabCtrl'
          }
        }
      })

      //第四个模块
      .state('tab.four', {
        url: '/four',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/four.html',
            controller: 'FourTabCtrl'
          }
        }
      })

      .state('tab.queryCompany', {
        url: '/queryCompany',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/queryInfo.html',
            controller: 'QueryCompanyCtrl'
          }
        }
      })

        .state('tab.dt_detail', {
            url: '/dt_detail/:name',
            views: {
                'tab-four': {
                    templateUrl: 'four/templates/dt_detail.html',
                    controller: 'DtDetailCtrl'
                }
            }
        })


        .state('tab.recommend', {
        url: '/recommend',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/recommend.html',
            controller: 'ReconmentCtrl'
          }
        }
      })

      .state('tab.setup', {
        url: '/setup',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/setup.html',
            controller: 'SetupCtrl'
          }
        }
      })

      .state('tab.help', {
        url: '/helpFeedBack',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/help.html',
            controller: 'HelpCtrl'
          }
        }
      })

      .state('tab.helpDetail', {
          url: '/helpDetail/:id',
          views: {
              'tab-four': {
                  templateUrl: 'four/templates/helpDetail.html',
                  controller: 'HelpDetailCtrl'
              }
          }
      })

      .state('tab.feedBack', {
        url: '/feedBack',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/feedBack.html',
            controller: 'FeedBackCtrl'
          }
        }
      })

      .state('tab.authCompany', {
        url: '/authCompany',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/authCompany.html',
            controller: 'AuthCompanyCtrl'
          }
        }
      })

      .state('tab.authCompanyTwo', {
        url: '/authCompanyTwo',
        views: {
          'tab-four': {
            templateUrl: 'four/templates/authCompanyTwo.html',
            controller: 'AuthCompanyTwoCtrl'
          }
        }
      })

        .state('tab.aboat', {
            url: '/aboat',
            views: {
                'tab-four': {
                    templateUrl: 'four/templates/aboat.html',
                    controller: 'AboatCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/loginPwd');
  }
])
