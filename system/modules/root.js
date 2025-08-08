(function () {
    'use strict';

    angular
        .module('app')
        .controller('RootController', RootController);

    RootController.$inject = ['ProjectService', '$rootScope', '$scope', '$filter', 'AuthenticationService', 'FlashService', 'MemberService', 'LemorasService'];
    function RootController(ProjectService, $rootScope, $scope, $filter, AuthenticationService, FlashService, MemberService, LemorasService) {
        var vm = this;

        vm.renewSession = RenewSession;
        vm.createProject = CreateProject;
        vm.createRole = CreateRole;
        vm.checkLemorasProject = CheckLemorasProject;

        vm.removeProject = RemoveProject;
        vm.activeOrPassive = ActiveOrPassive;

        vm.isOwnerLemorasProjects = [];
        vm.projects = [];
        vm.applications = [];

        vm.selectedApplication = {};
        vm.selectedProject = {};

        vm.account = {};
        vm.project = {};
        vm.role = {};
        vm.account.email = $rootScope.globals.currentUser.email;

        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.data = [];
        vm.q = '';

        vm.orderbyFieldQ = "";

        vm.orderbyField = function (name) {
            if (vm.orderbyFieldQ === "")
                vm.orderbyFieldQ = "-";
            else
                vm.orderbyFieldQ = "";

            vm.orderQ = vm.orderbyFieldQ + name;
        };


        vm.getData = function () {
            return $filter('filter')(vm.projects, vm.q)
        }

        vm.numberOfPages = function () {
            return Math.ceil(vm.getData().length / vm.pageSize);
        }

        $scope.$watch('q', function (newValue, oldValue) {
            if (oldValue != newValue) {
                vm.currentPage = 0;
            }
        }, true);


        initController();

        function initController() {
            loadApplications();
            loadProjects();
        }

        function loadProjects() {
            ProjectService.GetAll(function (response) {
                vm.projects = response.projects;
            });
        }

        function loadApplications() {
            getProjects(function (projects) {

                vm.isOwnerLemorasProjects = projects.filter(x => x.isOwnerLemoras  && x.appId > 0);

                projects = projects.filter(x => !x.isOwnerLemoras);

                var appIds = [... new Set(projects.map(x => x.appId))];

                var tmpGroup = Map.groupBy(projects, project => {
                    return project.appId;
                });

                var mainProjects = [];

                appIds.forEach(appId => {
                    var groups = tmpGroup.get(appId);

                    var preDomains = [];
                    groups.forEach(x => x.domains.forEach(y => preDomains.push(y)));

                    var domains = [... new Set(preDomains.map(x => x))];

                    var appName = groups[0].appName.replace("-panel", "");

                    mainProjects.push({ appId: appId, appName: appName, domains: domains });
                });

                vm.applications = mainProjects;
            });
        }

        function RemoveProject(project) {

            let text = notifyCodeMsg.find(x=> x.code == "0x11115").detail[$rootScope.langKey];

            if (confirm(text) == true) {
                try {
                    var tmpDomains = project.domains.split(",");
                    project.domains = tmpDomains;
                } catch { }
                project.requiredStatus = 0;
                project.manageMember = 0;
                project.memberStatus = 0;

                ProjectService.DeleteProject(project, function (response) {
                    if (response.status) {
                        // var index = vm.projects.indexOf(project);
                        // vm.projects.splice(index, 1);
                    } else {
                        alert(response.message);
                    }
                });
            }
        }

        function ActiveOrPassive(project) {

            var text = project.active ? notifyCodeMsg.find(x=> x.code == "0x11116").detail[$rootScope.langKey] : notifyCodeMsg.find(x=> x.code == "0x11117").detail[$rootScope.langKey];

            if (confirm(text) == true) {
                try {
                    var tmpDomains = project.domains.split(",");
                    project.domains = tmpDomains;
                } catch { }
                if (project.active) {
                    project.requiredStatus = 1;
                }
                if (!project.active) {
                    project.requiredStatus = 2;
                }
                project.manageMember = 0;
                project.memberStatus = 0;

                ProjectService.UpdateProject(project, function (response) {
                    if (response.status) {
                        project.active = !project.active;
                    } else {
                        alert(response.message);
                    }
                });
            }

        }

        function RenewSession() {

            if (vm.account.password == "" || vm.account.password == undefined) {
                alert(notifyCodeMsg.find(x=> x.code == "0x11118").detail[$rootScope.langKey]);
                return;
            }
            AuthenticationService.ClearCredentials();

            AuthenticationService.Login(vm.account.email, vm.account.password, function (response) {
                if (response.status) {
                    if (response.account.isRoot) {
                        response.account.lastLoginDate = response.account.createdAt;

                        var configURL = baseURL + "/system/root-config.json";

                        window.localStorage.setItem("loadconfig", configURL);

                        AuthenticationService.SetCredentials(response.account, false);
                        AuthenticationService.GetConfig(response.account, function (configData) {
                            FlashService.WriteLocal(false, configData);
                            alert(notifyCodeMsg.find(x=> x.code == "0x11119").detail[$rootScope.langKey]);

                            var template = window.localStorage.getItem("template");
                            var appName = window.localStorage.getItem("app");

                            window.location.href = '../../../apps/' + appName + '/' + template + '/index.html';
                        });
                    }
                } else {
                    alert(notifyCodeMsg.find(x=> x.code == "0x11120").detail[$rootScope.langKey]);
                    FlashService.Error(response.data.message, $location);
                    vm.dataLoading = false;
                }
                vm.dataLoading = false;
            });
        };

        function CreateProject() {

            if (vm.project.projectName == "" || vm.project.projectName == undefined) {
                alert(notifyCodeMsg.find(x=> x.code == "0x11038").detail[$rootScope.langKey]);
                return;
            }

            if (vm.selectedApplication == undefined) {
                alert(notifyCodeMsg.find(x=> x.code == "0x11121").detail[$rootScope.langKey]);
                return;
            }

            var tmpSelectedApplication = JSON.parse(vm.selectedApplication);

            vm.project.appId = tmpSelectedApplication.appId;
            vm.project.domains = tmpSelectedApplication.domains;
            vm.project.merchantId = generate_uuidv4();
            vm.project.isOwnerLemoras = false;

            vm.project.requiredStatus = 0;
            vm.project.manageMember = 0;
            vm.project.memberStatus = 0;

            ProjectService.CreateProject(vm.project, function (res) {
                if (res.status) {
                    alert(vm.project.projectName + notifyCodeMsg.find(x=> x.code == "0x11122").detail[$rootScope.langKey]);
                } else {
                    alert(res.message);
                }
            });

            function generate_uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function (c) {
                        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
                        return uuid.toString(16);
                    });
            }

        };

        function CreateRole() {

            if (vm.role.email == "" || vm.role.email == undefined) {
                alert(notifyCodeMsg.find(x=> x.code == "0x11123").detail[$rootScope.langKey]);
                return;
            }

            if (vm.selectedProject == undefined) {
                alert(notifyCodeMsg.find(x=> x.code == "0x11121").detail[$rootScope.langKey]);
                return;
            }

            var tmpSelectedProject = JSON.parse(vm.selectedProject);
            vm.role.roleId = 2;
            vm.role.appId = tmpSelectedProject.appId;
            vm.role.merchantId = tmpSelectedProject.merchantId;

            MemberService.CreateRole(vm.role, function (res) {
                if (res.status) {
                    alert(vm.role.email + notifyCodeMsg.find(x=> x.code == "0x11124").detail[$rootScope.langKey]);
                } else {
                    alert(res.message);
                }
            });

        };

        function getProjects(callback) {
            var configURL = window.localStorage.getItem("loadconfig");
            var tempConfigURL = baseURL + "/system/config.json";

            if (window.location.hostname == paramLocalDomain) {
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

                callback(projects);
            });
        }

        function CheckLemorasProject() {
            var projects = vm.isOwnerLemorasProjects;
           
            var appIds = [... new Set(projects.map(x => x.appId))];

            var tmpGroup = Map.groupBy(projects, project => {
                return project.appId;
            });

            var mainProjects = [];

            appIds.forEach(appId => {
                var groups = tmpGroup.get(appId);

                var preDomains = [];
                groups.forEach(x => x.domains.forEach(y => preDomains.push(y)));

                var domains = [... new Set(preDomains.map(x => x))];

                var appName = groups[0].appName.replace("-panel", "");

                mainProjects.push({ appId: appId, appName: appName, domains: domains });
            });

            LemorasService.CheckLemorasProject(mainProjects, function (response) {
                if (response.status) {
                    alert(notifyCodeMsg.find(x=> x.code == "0x11125").detail[$rootScope.langKey]);
                } else {
                    alert(response.message);
                }
            });
        }

        return vm;
    };

})();