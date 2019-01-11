angular
    .module('smartcard.first.servers', [])
    .factory('FirstServe', ['SmdkRestAngular', function(SmdkRestAngular) {
            return {
                findbyquery: function(data) {
                    var all = SmdkRestAngular.allUrl('/cardmessage/findbyquery');
                    return all.post(data);
                },
                addcardmessage: function(data) {
                    var all = SmdkRestAngular.allUrl('/cardmessage/addcardmessage');
                    return all.post(data);
                },
            };
        }
    ])
