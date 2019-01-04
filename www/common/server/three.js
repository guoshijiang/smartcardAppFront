angular
  .module('starter.three.services', [])
  /**
   * 第三模块的辅销资料服务
   * */
  .factory('ThreeServe', [
    'SmdkRestAngular',
    function(SmdkRestAngular) {
      return {
        //企业详情
        getCompanyDetail: function(data) {
          var all = SmdkRestAngular.allUrl('/companyquery/searchcompany')
          return all.post(data)
        },
        //模糊查询
        getCompanyBykeyWord: function(data) {
          var all = SmdkRestAngular.allUrl(
            '/companyquery/searchcompanybykeyword'
          )
          return all.post(data)
        },
        //茶老板
        getCompanyBoss: function(data) {
          var all = SmdkRestAngular.allUrl('/companyquery/searchcompanyboss')
          return all.post(data)
        },
        //查电话
        getCompanyPhone: function(data) {
          var all = SmdkRestAngular.allUrl('/companyquery/searchcompanyphone')
          return all.post(data)
        },
        //查业务
        getCompanyProduct: function(data) {
          var all = SmdkRestAngular.allUrl('/companyquery/searchcompanyproduct')
          return all.post(data)
        },
          findbyquery: function(data) {
              var all = SmdkRestAngular.allUrl('/cardmessage/findbyquery');
              return all.post(data);
          }
      }
    }
  ])
