angular
    .module('smartcard.two.servers', [])

    .factory('TwoServe', ['SmdkRestAngular', function(SmdkRestAngular) {
        return {
            findMkeepByUserid: function(data) {
                var all = SmdkRestAngular.allUrl('/mkeep/findmkeepbyuserid');
                return all.post(data);
            },

            findMkeepById: function(data) {
                var all = SmdkRestAngular.allUrl('/mkeep/findmkeepbyId');
                return all.post(data);
            },

            searchMkeepByKeyword: function(data) {
                var all = SmdkRestAngular.allUrl('/cardmessage/searchmankeppistinfo');
                return all.post(data);
            },

            searchMkeepDetail: function(data) {
                var all = SmdkRestAngular.allUrl('/cardmessage/findcardmessagebyid');
                return all.post(data);
            }
        };
    }])
