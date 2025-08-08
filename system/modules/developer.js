(function () {
    'use strict';

    angular
        .module('app')
        .controller('DeveloperController', DeveloperController);

    DeveloperController.$inject = ['$rootScope', 'getjson', 'AuthenticationService', 'FlashService', 'LemorasService']; //, 'LemorasService'];
    function DeveloperController($rootScope, getjson, AuthenticationService, FlashService, LemorasService) {//, LemorasService) {
        var vm = this;

        vm.system = "";

        vm.username = "admin";
        vm.password = "1234";

        vm.configCheck = {};

        vm.showData = showData;

        vm.reset = reset;
        vm.fakeLogin = fakeLogin;

        function readConfig() {
            vm.jsonText = JSON.stringify($rootScope.public_config, undefined, 4);
        }

        readConfig();

        function reset() {
            AuthenticationService.ClearCredentials();
            alert(notifyCodeMsg.find(x=> x.code == "0x11126").detail[$rootScope.langKey]);
        }

        function startInitSystem() {

            getProjects(function (projects) {

                projects = projects.filter(x=> x.isOwnerLemoras && x.appId > 0);

                var appIds =[... new Set(projects.map(x=> x.appId))];

                var tmpGroup = Map.groupBy(projects, project => {
                    return project.appId;
                });

                var mainProjects = [];
         
                appIds.forEach(appId => {          
                    var groups = tmpGroup.get(appId);

                    var preDomains = [];
                    groups.forEach(x=> x.domains.forEach(y=> preDomains.push(y)));

                    var domains =[... new Set(preDomains.map(x=> x))];

                    var appName = groups[0].appName.replace("-panel", "");

                    mainProjects.push({ appId: appId, domains: domains, appName: appName});
                });

                LemorasService.InitSystem(mainProjects, function (response) {
                    if (response.status) {
                        alert(notifyCodeMsg.find(x=> x.code == "0x11104").detail[$rootScope.langKey]);
                        alert(notifyCodeMsg.find(x=> x.code == "0x11105").detail[$rootScope.langKey] + response.account.password);
                    } else {
                        if (response.message != "Email address already in use by another user.") {
                            alert(notifyCodeMsg.find(x=> x.code == "0x11106").detail[$rootScope.langKey]);
                        }
                        FlashService.Error(response.message, '/');
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });

            });

        }

        function getProjects(callback) {
            var configURL = window.localStorage.getItem("loadconfig");
            var tempConfigURL = baseURL + "/system/config.json";

            if (configURL.includes(paramLocalDomain)) {
                tempConfigURL = baseURL + "/system/local-config.json";
            }

            window.localStorage.setItem("loadconfig", tempConfigURL);

            AuthenticationService.GetConfigs("", [], function (configs) {
                var projects = [];
                configs.forEach(config => {

                    projects.push({
                        appId: config.appId,
                        domains: config.domains,
                        appName: config.app,
                        manageMember: config._id == typeRoles.Member,
                        isOwnerLemoras: config.isOwnerLemoras
                    });

                });

                window.localStorage.setItem("loadconfig", configURL);

                console.log(projects);
                callback(projects);
            });
        }

        function fakeLogin() {
            AuthenticationService.FakeLogin(vm.username, vm.password, function (response) {

                if (response.status) {
                    FlashService.WriteLocal(false, response.message);
                    var template = window.localStorage.getItem("template");
                    var appName = window.localStorage.getItem("app");

                    window.location.href = '../../../apps/' + appName + '/' + template + '/index.html'; //$location.path('/load');
                } else {
                    FlashService.Error(response.message, '/');
                    vm.dataLoading = false;
                }
                vm.dataLoading = false;
            });
        }

        function showData() {

            alert(JSON.stringify(vm.configCheck));
        }

        //readSystem();
        var configURL = window.localStorage.getItem("loadconfig");
        if (configURL.includes("root-config")) {
            startInitSystem();
        }    
    }

})();