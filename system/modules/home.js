(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', '$rootScope', 'ProjectService'];
    function HomeController($location, $rootScope, ProjectService) {
        var vm = this;

        vm.externalLogin = externalLogin; 
        $rootScope.externalLogin = externalLogin; 
       
        $rootScope.staticPage.isNonHome = false;
        (function initController() {
            if (!mainLandUrl.includes(window.location.hostname) && !mainAccountUrl.includes(window.location.hostname)) {
                ProjectService.GetMerchantByDomain(function(res){
                    //alert(JSON.stringify(res));
                    window.localStorage.setItem("projects", JSON.stringify(res.projects)); //todo:merchant.bkz
                });
            }
        })();
        
        function externalLogin() {
          
            var domainStringApps = window.localStorage.getItem("domainApps");
            var strProjects = window.localStorage.getItem("projects");
            var projects = undefined;
            if (strProjects != undefined && strProjects != "undefined") {
                projects = JSON.parse(strProjects);
            } else { 
                alert(notifyCodeMsg.find(x=> x.code == "0x11137").detail[$rootScope.langKey]);
                return;
            }
            var domainApps = JSON.parse(domainStringApps);
            var externalData = {
                returnUrl: window.location.hostname,
                domainApps: domainApps,
                projects: projects
            };
            var externalStringData = JSON.stringify(externalData);

            var externalURL = "http://" + mainLandUrl[0] + "/#!/login?return=callback&type=" + externalStringData;
            
            window.location.replace(externalURL);
        }
    }

})();
