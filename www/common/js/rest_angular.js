/**
 * Created by ID on 17/6/1.
 * Author:suzhen
 * email:suzhen@stark.tm
 */
angular
  .module('smdk.common.service.rest', ['restangular'])
  // .factory('AccountRestAngularNoToken', function(Restangular, ENV) {
  //   return Restangular.withConfig(function(RestangularConfigurer) {
  //     if (ENV.encode) {
  //       RestangularConfigurer.setDefaultHeaders({
  //         'x-access-token': {},
  //         server_type: 'user'
  //       })
  //     } else {
  //       RestangularConfigurer.setDefaultHeaders({
  //         'x-access-token': {}
  //       })
  //       RestangularConfigurer.setBaseUrl(ENV.api.account)
  //     }
  //   })
  // })
  .factory('GetToken', function(AuthenticationService) {
    return {
      getToken: function() {
        var token
        var user = AuthenticationService.getUserInfo()
        //var user = window.sessionStorage.setItem('userInfo', window.JSON.stringify(data));
        if (user) {
          token = user.token
        } else {
          token = ''
        }
        return token
      }
    }
  })
  .factory('AuthenticationService', [
    'Storage',
    '$log',
    '$location',
    '$q',
    function(Storage, $log, $location, $q) {
      var userInfo
      var companyInfo

      function getUserInfo() {
        if (Storage.get('userInfo')) {
          userInfo = Storage.get('userInfo')
          return userInfo
        } else {
          return null
        }
      }

      function getCompanyInfo() {
        if (Storage.get('userInfo').company) {
          companyInfo = Storage.get('userInfo').company
          return companyInfo
        } else {
          return null
        }
      }

      return {
        getUserInfo: getUserInfo,
        getCompanyInfo: getCompanyInfo,
        checkToken: function() {
          userInfo = getUserInfo()
          if (userInfo) {
            return $q.when(userInfo)
          } else {
            return $q.reject({
              authenticated: false
            })
          }
        }
      }
    }
  ])
  /**
   * 浏览器本地存储操作
   */
  .factory('Storage', function(ENV) {
    function Storage(storge) {
      this.set = function(key, data) {
        return storge.setItem(key, window.JSON.stringify(data)) //local

        //return window.sessionStorage.setItem(key, window.JSON.stringify(data)) ; //session
      }
      this.get = function(key) {
        return window.JSON.parse(storge.getItem(key))
        //return window.JSON.parse(window.sessionStorage.getItem(key)) ; //session
      }
      this.remove = function(key) {
        storge.removeItem(key)
        //return window.sessionStorage.removeItem(key) ; //session
      }
      //清楚所有的
      this.clear = function() {
        storge.clear()
      }
    }

    return new Storage(ENV.local)
  })

  //家政服务超市请求接口
  .factory('SmdkRestAngular', function(Restangular, ENV, GetToken) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      if (ENV.encode) {
        RestangularConfigurer.setDefaultHeaders({
          // 'x-access-token': GetToken.getToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
          'Content-Type': 'application/json;charset=utf-8'
        })
      } else {
        RestangularConfigurer.setDefaultHeaders({
          // 'x-access-token': GetToken.getToken(),
          'Content-Type': 'application/json;charset=utf-8'
        })
        // RestangularConfigurer.setDefaultHttpFields({
        //   transformRequest: function(data) {
        //     var str = []
        //     for (var p in data) {
        //       str.push(
        //         encodeURIComponent(p) + '=' + encodeURIComponent(data[p])
        //       )
        //     }
        //     return str.join('&')
        //   }
        // })
        RestangularConfigurer.setBaseUrl(ENV.api.Home)
      }
    })
  })
