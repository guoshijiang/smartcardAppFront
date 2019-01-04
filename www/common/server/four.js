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
            }
        };
    }])
