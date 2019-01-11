angular
    .module('smartcard.account.servers', [])
    .factory('AccountServe', ['SmdkRestAngular', function(SmdkRestAngular) {
        return {
            getVerifyCode:function(data) {
              var all = SmdkRestAngular.allUrl('/winchuser/sendcode');
              return all.post(data);
            },

            register: function(data) {
                var all = SmdkRestAngular.allUrl('/winchuser/addwinchuser');
                return all.post(data);
            },

            loginByPhoneCode: function(data) {
                var all = SmdkRestAngular.allUrl('/winchuser/loginbycode');
                return all.post(data);
            },

            loginByUserAndPwd: function(data) {
                var all = SmdkRestAngular.allUrl('/winchuser/loginbypassword');
                return all.post(data);
            },

            registerComplishInfo: function(data) {
                var all = SmdkRestAngular.allUrl('/winchuser/updatewinchuser');
                return all.post(data);
            },

            addCardMessage: function(data) {
                var all = SmdkRestAngular.allUrl('/cardmessage/addcardmessage');
                return all.post(data);
            },

            registerInfoToCard: function(data) {
                var all = SmdkRestAngular.allUrl('/winchuser/addwinchuser');
                return all.post(data);
            }
        };
    }])

