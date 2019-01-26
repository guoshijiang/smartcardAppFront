angular
    .module('smartcard.four.servers', [])

    .factory('FourServe', ['SmdkRestAngular', function(SmdkRestAngular) {
        return {
            findbyquery: function(data) {
                var all = SmdkRestAngular.allUrl('/connection/findall');
                return all.post(data);
            },

            findHelpContentById: function(data) {
                var all = SmdkRestAngular.allUrl('/connection/findhelpcontentbyid');
                return all.post(data);
            },

            findUserById: function (data) {
                var all = SmdkRestAngular.allUrl('/winchuser/findwinchuserbyid');
                return all.post(data);
            },

            findUserInfoById: function (data) {
                var all = SmdkRestAngular.allUrl('/winchuserinfo/findwinchuserinfobyuserid');
                return all.post(data);
            }
        };
    }])
