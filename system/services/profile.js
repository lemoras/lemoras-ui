(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProfileService', ProfileService);

    //baseURL.includes(paramLocalDomain) ? baseURL : "http://kimlik.online";

    var updateUrl = zoeURL + 'security/account';
    var passwordUrl = zoeURL + 'security/account';
    var getUrl = zoeURL + 'security/account';
    var logoutApiUrl = zoeURL + '/api/logout';

    ProfileService.$inject = ['getjson', 'notification'];
    function ProfileService(getjson, notification) {
        var service = {};
        
        service.Get = Get;
        service.Put = Put;

        service.Zoe = Zoe;
        service.Logout = Logout;

        return service;

        function Put(account, callback) {
            getjson.putData(updateUrl, account, false, true).then(function (res) {
                callback(res);
            });
        }

        function Zoe(zoe, callback) {
            if (zoe.newPassword != zoe.reNewPassword) {
                notification.pushWarningNotify("0x11075:Yeni şifreler uyuşmamaktadır");
                return;
            }
            var newPassword = zoe.currentPassword + "#change-password#" + zoe.newPassword;
            var data = { password : newPassword };
            getjson.putData(passwordUrl, data, false, true).then(function (res) {
                callback(res);
            });
        }
        
        function Get(callback) {
            getjson.getData(getUrl, true).then(function (res) {
                    callback(res);  
            });            
        }

        function Logout() {
            // getjson.getData(logoutApiUrl, true).then(function (res) {

            // });
        }
    }

})();
