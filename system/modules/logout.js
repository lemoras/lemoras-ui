(function () {
    'use strict';

    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$rootScope', '$scope', 'ProfileService', 'AuthenticationService'];
    function LogoutController($rootScope, $scope, ProfileService, AuthenticationService) {
        var vm = this;

        var logout = function () {
           
            ProfileService.Logout();

            var strSessions = window.localStorage.getItem("sessions") || "";
            AuthenticationService.ClearCredentials();

            if (!mainAccountUrl.includes(window.location.hostname)) {
         
                var externalURL = "http://" + mainAccountUrl[0] + "/#!?return=" + window.location.hostname + "&type=logoutAuth";

                window.location.replace(externalURL);
            }else {
               
                var strOriginReturn = window.location.origin;
                var modifystrOriginReturn = "&originReturn=" + window.location.hostname;
                if (strSessions != "") {
                    var sessions = JSON.parse(strSessions);

                    sessions = sessions.filter(x=> !mainAccountUrl.includes(x) && x != window.location.host);

                     if (sessions.length == 0) {
                        window.location.replace(strOriginReturn + "/#!/login");
                        return;
                    };

                    var eDomain = sessions[0];

                    sessions = sessions.filter(x=> x != eDomain);
                    var newStrSession = JSON.stringify(sessions);

                    var externalURL = "http://" + eDomain + "/#!?return=" + window.location.hostname + "&type=logoutAuth&sessions=" + newStrSession + modifystrOriginReturn;

                    window.location.replace(externalURL);
                    return;

                }else {
                    window.location.replace(strOriginReturn + "/#!/login");
                }
            }
        };

   
        askQuestion(notifyCodeMsg.find(x=> x.code == "0x11128").detail[$rootScope.langKey],
            notifyCodeMsg.find(x=> x.code == "0x11127").detail[$rootScope.langKey],
            notifyCodeMsg.find(x=> x.code == "0x11127").detail[$rootScope.langKey],
            notifyCodeMsg.find(x=> x.code == "0x11129").detail[$rootScope.langKey], logout);
    
    };

})();