(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'MemberService', 'ProjectService'];
    function LoginController($location, AuthenticationService, FlashService, MemberService, ProjectService) {
        var vm = this;

        vm.login = login;
        vm.externalLogin = externalLogin;
        vm.buildToken = buildToken;
        vm.goRegister = goRegister;

        vm.returnParam = null;
        vm.typeParam = null;

        vm.selectedApplication = {};

        vm.account = {};

        vm.allApplication = [];
        vm.loginFormDisplay = false;

        vm.returnUrl = "";
        vm.appIds = [];
        vm.projects = undefined;

        vm.firstTakenToken = "";
        vm.authLoginByToken = "";

        vm.viewSelectApp = true;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
            // var urlParams = new URLSearchParams(window.location.search);
            // vm.returnParam = urlParams.get('return');
            // vm.typeParam = urlParams.get('type');
            vm.returnUrl = "";
            vm.appIds = [];
            vm.projects = undefined;
            var urlParams = $location.search();
            vm.returnParam = urlParams.return;
            vm.typeParam = urlParams.type;
            vm.fakeAppParam = urlParams.fakeApp;

            vm.emailParam = urlParams.email;
            vm.tokenParam = urlParams.token;
            vm.handleLoginParam = urlParams.handleLogin;
            
            if (vm.typeParam != "" && vm.typeParam != undefined && vm.returnParam == "internal") {
                var returnStringData = vm.typeParam;
                var returnData = JSON.parse(returnStringData);
              
                AuthenticationService.InternalLogin(returnData, function (response) {
                    if (response.status) {
                        FlashService.WriteLocal(false, response.message);
                        openApplication();
                    } else {
                        FlashService.Error(response.message, '/');
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });
            }

            if (vm.emailParam != "" && vm.emailParam != undefined && vm.returnParam == "triggerCallback") {
                
                var domainStringApps = window.localStorage.getItem("domainApps");
                
                ProjectService.GetMerchantByDomain(function (res) {
                    window.localStorage.setItem("projects", JSON.stringify(res.projects)); //todo:merchant.bkz

                    var strProjects = window.localStorage.getItem("projects");
                    var projects = undefined;
                    if (strProjects != undefined) {
                        projects = JSON.parse(strProjects);
                    }
                    var domainApps = JSON.parse(domainStringApps);
                    var externalData = {
                        returnUrl: window.location.hostname,
                        domainApps: domainApps,
                        projects: projects
                    };

                    var externalStringData = JSON.stringify(externalData);

                    var callbackTokenParam = "";

                    if (vm.tokenParam != "" && vm.tokenParam != undefined && vm.returnParam == "triggerCallback") {
                        callbackTokenParam = "&token=" + vm.tokenParam;
                    }

                    var externalURL = "http://" + mainLandUrl[0] + "/#!/login?return=callback&type=" + externalStringData
                    + "&email=" + vm.emailParam + callbackTokenParam;

                    window.location.replace(externalURL);
                    return;
                });
            }

            if (vm.emailParam != "" && vm.emailParam != undefined && vm.returnParam == "callback") {
                
                $(document).ready(function() {
                    document.getElementById("email").disabled = true;
                });
                
                vm.email = vm.emailParam;

                if (vm.tokenParam != "" && vm.tokenParam != undefined && vm.returnParam == "callback") {

                    $(document).ready(function() {
                        document.getElementById("password").disabled = true;
                    });
                    AuthenticationService.SetSecToken(vm.tokenParam);
                    vm.authLoginByToken = AuthenticationService.GetSecTokenFromScope();
                    login();
                    return;
                }
            }

            if (vm.handleLoginParam != "" && vm.handleLoginParam != undefined && vm.returnParam == "handleCallback") {
                var handleLogin = JSON.parse(vm.handleLoginParam);
       
                vm.returnUrl = handleLogin.returnUrl;

                AuthenticationService.ProfileLogin(handleLogin.returnData.account, handleLogin.firstTakenToken, function (response2) {
                    if (response2.status) {
                        FlashService.WriteLocal(false, response2.message);
                        AuthenticationService.SetSession(vm.returnUrl);
                        returnDomainByReturnData(handleLogin.returnData);
                    } else {
                        FlashService.Error(response2.message, '/');
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });
        
            }

            if (window.localStorage.getItem("projects") == "undefined" && vm.returnParam != "callback") {
                ProjectService.GetMerchantByDomain(function (res) {
                    window.localStorage.setItem("projects", JSON.stringify(res.projects)); //todo:merchant.bkz
                });
            }

        })();

        function login() {
            vm.dataLoading = true;

            if (vm.returnParam != null) {

                if (vm.returnParam == "callback") {
                    var externalData = JSON.parse(vm.typeParam);
                    vm.returnUrl = externalData.returnUrl;
                    vm.appIds = externalData.domainApps;
                    vm.projects = externalData.projects;

                    AuthenticationService.ExternalLogin(vm.email, vm.password, vm.returnUrl, vm.appIds, vm.projects, function (response) {
                        if (response.status) {
                            vm.firstTakenToken = response.account.token;
                            if (response.account.appCount > 1) {
                                vm.account = response.account;
                                vm.loginFormDisplay = true;
                                loadAllApplication();
                            }
                            else {
                                if (response.account.roleId == undefined && response.account.merchantId == undefined && response.account.appId == undefined) {
                                    var createMemberData = vm.appIds.find(x => x.type_id == typeRoles.Member);
                                    if (createMemberData != undefined) {
                                        var createRoleData = {
                                            appId: createMemberData.appId,
                                            merchantId: vm.projects[0].merchantId
                                        };
                                        MemberService.CreateRole(createRoleData, function (res) {
                                            if (res.status) {
                                                AuthenticationService.ClearCredentials();
                                                if (vm.authLoginByToken != "" && vm.authLoginByToken != undefined && vm.authLoginByToken != "undefined") {
                                                    AuthenticationService.SetSecToken(vm.tokenParam);
                                                }
                                                login();
                                            }
                                        });
                                        AuthenticationService.ClearCredentials();
                                    }
                                    AuthenticationService.ClearCredentials();
                                } else {
                                    var roleCaseDomain = response.account.roleId == typeRoles.Member ? "": paramLocalAdminSubdomain;
                                    var tmpAppDomains = response.account.domains.filter(g=> !mainLandUrl.includes(g) && !mainAccountUrl.includes(g));
                                    if (tmpAppDomains != undefined && tmpAppDomains.length > 0) {
                                        var tmpAppDomain = "";
                                        if (roleCaseDomain == paramLocalAdminSubdomain) {
                                            tmpAppDomain = tmpAppDomains.find(f=> f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                                        }else {
                                            tmpAppDomain = tmpAppDomains.find(f=> !f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                                        }
                                        vm.returnUrl = tmpAppDomain;
                                    }
                                    AuthenticationService.BuildToken(response.account, function (resRole) {
                                        if (resRole.status) {
                                            loginByAccount(resRole.account, vm.firstTakenToken, vm.returnUrl); // CCCPP
                                            // returnDomain(resRole.account);
                                        } else {
                                            FlashService.Error(response.message, $location);
                                            AuthenticationService.ClearCredentials();
                                        }
                                        vm.dataLoading = false;
                                    });
                                }
                            }
                        } else {
                            AuthenticationService.ClearCredentials();
                            FlashService.Error(response.message, $location);
                        }
                    }, vm.authLoginByToken);
                    vm.dataLoading = false;
                }
            }
            else {
                if (vm.typeParam == null) {


                    var domainStringApps = window.localStorage.getItem("domainApps");
                    var domainApps = JSON.parse(domainStringApps);

                    AuthenticationService.Login(vm.email, vm.password, function (response) {
                        if (response.status) {
                            vm.firstTakenToken = response.account.token; 
                            if (response.account.appCount > 1) {
                                vm.account = response.account;
                                vm.loginFormDisplay = true;
                                loadAllApplication();
                            } else {
                                if (response.account.roleId == undefined && response.account.merchantId == undefined && response.account.appId == undefined) {
                                    var domainStringApps = window.localStorage.getItem("domainApps");
                                    var strProjects = window.localStorage.getItem("projects");
                                    var projects = undefined;
                                    if (strProjects != undefined && strProjects != "undefined") {
                                        projects = JSON.parse(strProjects);
                                    }

                                    // if ((projects == "null" || projects == "undefined" || projects == undefined || projects == "") && mainLandUrl.includes(window.location.hostname)) {

                                    // }

                                    if (domainStringApps != undefined && domainStringApps != null && domainStringApps != "") {
                                        var domainApps = JSON.parse(domainStringApps);
                                        var domainApp = domainApps.find(x => x.type_id == typeRoles.Member);

                                        if (domainApp != undefined) {

                                            if (domainApp.appId == 0 && mainAccountUrl.includes(window.location.hostname)) {
                                                AuthenticationService.ProfileLogin(response.account, vm.firstTakenToken, function (response2) {
                                                    if (response2.status) {
                                                        FlashService.WriteLocal(false, response2.message);
                                                        var template = window.localStorage.getItem("template");
                                                        var appName = window.localStorage.getItem("app");
                                                        window.location.href = '../../../apps/' + appName + '/' + template + '/index.html';  //$location.path('/load');
                                                    } else {
                                                        FlashService.Error(response2.message, '/');
                                                        vm.dataLoading = false;
                                                    }
                                                    vm.dataLoading = false;
                                                });

                                                return;

                                            } else {
                                                var createRoleData = {
                                                    appId: domainApp.appId,
                                                    merchantId: projects[0].merchantId
                                                };
                                                MemberService.CreateRole(createRoleData, function (res) {
                                                    if (res.status) {
                                                        AuthenticationService.ClearCredentials();
                                                        login();
                                                    }
                                                });
                                            }
                                        }
                                        AuthenticationService.ClearCredentials();// belki silinebilir
                                    }
                                    AuthenticationService.ClearCredentials(); // belki silinebilir
                                    FlashService.Error(response.message, '/');
                                    vm.dataLoading = false;
                                } else {
                                    AuthenticationService.BuildToken(response.account, function (resp) {
                                        if (resp.status) {
                                            FlashService.WriteLocal(false, resp.message);
                                            var roleCaseDomain = response.account.roleId == typeRoles.Member ? "": paramLocalAdminSubdomain;

                                            var tmpAppDomains = resp.account.domains.filter(g=> !mainLandUrl.includes(g) && !mainAccountUrl.includes(g));
                       
                                            if (tmpAppDomains != undefined && tmpAppDomains.length > 0) {
                                                var tmpAppDomain = "";
                                                if (roleCaseDomain == paramLocalAdminSubdomain) {
                                                    tmpAppDomain = tmpAppDomains.find(f=>  f.includes(paramLocalAdminSubdomain)  && f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                                                }else {
                                                    tmpAppDomain = tmpAppDomains.find(f=>  !f.includes(paramLocalAdminSubdomain)  && f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                                                }
                                                vm.returnUrl = tmpAppDomain;
                                                AuthenticationService.ProfileLogin(response.account, vm.firstTakenToken, function (response2) {
                                                    if (response2.status) {
                                                        FlashService.WriteLocal(false, response2.message);
                                                      
                                                        returnDomain(response.account, false);
                                                    } else {
                                                        FlashService.Error(response2.message, '/');
                                                        vm.dataLoading = false;
                                                    }
                                                    vm.dataLoading = false;
                                                });

                                                return;
                                            };

                                            openApplication();
                                        } else {
                                            AuthenticationService.ClearCredentials();
                                            FlashService.Error(response.message, '/');
                                            vm.dataLoading = false;
                                        }

                                        vm.dataLoading = false;
                                    });
                                }
                            }
                        } else {
                            AuthenticationService.ClearCredentials();
                            FlashService.Error(response.data.message, $location);
                            vm.dataLoading = false;
                        }
                        vm.dataLoading = false;
                    });
                }
                else {
                    if (vm.typeParam == "fake") {
                        var fakeAppId = 0;
                        if (vm.fakeAppParam != null || vm.fakeAppParam == undefined
                            || vm.fakeAppParam != "" || vm.fakeAppParam != nil) {
                            fakeAppId = parseInt(vm.fakeAppParam);
                        }
                        AuthenticationService.FakeLogin(vm.email, vm.password, fakeAppId, function (response) {

                            if (response.status) {
                                FlashService.WriteLocal(false, response.message);
                                var template = window.localStorage.getItem("template");
                                var appName = window.localStorage.getItem("app");
                                window.location.href = '../../../apps/' + appName + '/' + template + '/index.html';  //$location.path('/load');
                            } else {
                                FlashService.Error(response.message, '/');
                                vm.dataLoading = false;
                            }
                            vm.dataLoading = false;
                        });

                    } else {
                        //external api login

                    }
                }
                vm.dataLoading = false;
            }
        };

        function buildToken() {

            vm.account.appId = vm.selectedApplication.appId;
            vm.account.roleId = vm.selectedApplication.roleId;
            vm.account.merchantId = vm.selectedApplication.merchantId;
            vm.account.record = vm.selectedApplication.record;
            vm.account.projectId = vm.selectedApplication.projectId;

            vm.account.domains = vm.selectedApplication.domains;

            if (!vm.account.record && (vm.account.merchantId == "" || vm.account.merchantId == undefined || vm.account.merchantId == null)
                && vm.account.projectId != "" && vm.account.projectId != undefined && vm.account.projectId != null) {

                var tmpProject = vm.projects.find(x=> x.projectId == vm.account.projectId);

                if (vm.account.roleId != undefined && vm.account.merchantId != undefined && vm.account.appId != undefined) {
                    var createMemberData = vm.appIds.find(x => x.type_id == typeRoles.Member && x.type_id == vm.account.roleId && x.appId == vm.account.appId);
                    if (createMemberData != undefined) {
                        var createRoleData = {
                            appId: createMemberData.appId,
                            merchantId: tmpProject.merchantId
                        };
                        MemberService.CreateRole(createRoleData, function (res) {
                           if (!res.status) {
                                FlashService.Error(response.message, '/');
                                vm.dataLoading = false;
                                return;
                            }else {
                                vm.account.merchantId = tmpProject.merchantId;
                                // --test
                                var roleCaseDomain = vm.account.roleId == typeRoles.Member ? "": paramLocalAdminSubdomain;
                                var tmpAppDomains = vm.account.domains.filter(g=> !mainLandUrl.includes(g)  && !mainAccountUrl.includes(g));
                            
                                if (tmpAppDomains != undefined && tmpAppDomains.length > 0) {
                                    var tmpAppDomain = "";
                                    if (roleCaseDomain == paramLocalAdminSubdomain) {
                                        tmpAppDomain = tmpAppDomains.find(f=> f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                                    }else {
                                        tmpAppDomain = tmpAppDomains.find(f=> !f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                                    }
                                    vm.returnUrl = tmpAppDomain;
                                }
                                // test
                                AuthenticationService.BuildToken(vm.account, function (response) {
                                if (response.status) {
                                    loginByAccount(response.account, vm.firstTakenToken, vm.returnUrl); // CCCPP
                                        // returnDomain(response.account);
                                } else {
                                    FlashService.Error(response.message, $location);
                                    AuthenticationService.ClearCredentials();
                                    vm.dataLoading = false;
                                }
                                vm.dataLoading = false;
                            });
                            }
                        });
                    }
                }

                return;
            }

            AuthenticationService.BuildToken(vm.account, function (response) {
                if (response.status) {
                    if (vm.returnUrl == "" && vm.appIds.length == 0) {
                        FlashService.WriteLocal(false, response.message);

                        var roleCaseDomain = vm.account.roleId == typeRoles.Member ? "": paramLocalAdminSubdomain;
                        var tmpAppDomains = vm.account.domains.filter(g=> !mainLandUrl.includes(g)  && !mainAccountUrl.includes(g));
                       
                        if (tmpAppDomains != undefined && tmpAppDomains.length > 0) {
                            var tmpAppDomain = "";
                            if (roleCaseDomain == paramLocalAdminSubdomain) {
                                tmpAppDomain = tmpAppDomains.find(f=> f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                            }else {
                                tmpAppDomain = tmpAppDomains.find(f=> !f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                            }
                            vm.returnUrl = tmpAppDomain;
                    
                            AuthenticationService.ProfileLogin(response.account, vm.firstTakenToken, function (response2) {
                                if (response2.status) {
                                    FlashService.WriteLocal(false, response2.message);
                                    returnDomain(response.account, false);
                                } else {
                                    FlashService.Error(response2.message, '/');
                                    vm.dataLoading = false;
                                }
                                vm.dataLoading = false;
                            });

                            return;
                        };
                        
                        openApplication();
                    } else {
                        var roleCaseDomain = vm.account.roleId == typeRoles.Member ? "": paramLocalAdminSubdomain;
                        var tmpAppDomains = vm.account.domains.filter(g=> !mainLandUrl.includes(g)  && !mainAccountUrl.includes(g));
                       
                        if (tmpAppDomains != undefined && tmpAppDomains.length > 0) {
                            var tmpAppDomain = "";
                            if (roleCaseDomain == paramLocalAdminSubdomain) {
                                tmpAppDomain = tmpAppDomains.find(f=> f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                            }else {
                                tmpAppDomain = tmpAppDomains.find(f=> !f.includes(paramLocalAdminSubdomain)  &&  f.includes(paramLocalDomain)  && workLocalConfig) || tmpAppDomains[0];
                            }
                            vm.returnUrl = tmpAppDomain;
                        }
                        loginByAccount(response.account, vm.firstTakenToken, vm.returnUrl); // CCCPP
                        // returnDomain(response.account);
                    }
                } else {
                    FlashService.Error(response.message, '/');
                    vm.dataLoading = false;
                }
                vm.dataLoading = false;
            });
        }

        function openApplication() {
            var template = window.localStorage.getItem("template");
            var appName = window.localStorage.getItem("app");

            window.location.href = '../../../apps/' + appName + '/' + template + '/index.html';  //$location.path('/load');
            //window.location.href = "http://" + window.location.hostname + '/apps/' + appName + '/' + template + '/index.html';  //$location.path('/load');
        }

        function returnDomain(account, isClear = true) {
            var template = window.localStorage.getItem("template");
            var appName = window.localStorage.getItem("app");
            var xTemplate = window.localStorage.getItem("Xtemplate");
            var language = window.localStorage.getItem("language");
            var configType = window.localStorage.getItem("configType");
            var appId = window.localStorage.getItem("appId");

            var returnData = {
                template: template,
                appName: appName,
                xTemplate: xTemplate,
                language: language,
                configType: configType,
                appId: appId,
                account: account
            };

            if (isClear) {
                AuthenticationService.ClearCredentials();
            }
            var returnString = JSON.stringify(returnData);

            window.location.replace("http://" + vm.returnUrl + "/#!/login?return=internal&type=" + returnString);
        }

        function returnDomainByReturnData(returnData) {
   
            var returnString = JSON.stringify(returnData);

            window.location.replace("http://" + vm.returnUrl + "/#!/login?return=internal&type=" + returnString);
        }

        function loginByAccount(account, firstTakenToken, returnUrl) {
            var template = window.localStorage.getItem("template");
            var appName = window.localStorage.getItem("app");
            var xTemplate = window.localStorage.getItem("Xtemplate");
            var language = window.localStorage.getItem("language");
            var configType = window.localStorage.getItem("configType");
            var appId = window.localStorage.getItem("appId");

            var returnData = {
                template: template,
                appName: appName,
                xTemplate: xTemplate,
                language: language,
                configType: configType,
                appId: appId,
                account: account
            };

            var loginbyAccountData = {
                returnData: returnData,
                firstTakenToken: firstTakenToken,
                returnUrl: returnUrl
            };

            AuthenticationService.ClearCredentials();

            var returnString = JSON.stringify(loginbyAccountData);

            window.location.replace("http://" + mainAccountUrl[0] + "/#!/login?return=handleCallback&type=handleLogin&handleLogin=" + returnString);
        }

        function loadAllApplication() {
            AuthenticationService.GetUserApp(function (response) {
                vm.allApplication = response;
            });
        }

        function externalLogin() {

            var domainStringApps = window.localStorage.getItem("domainApps");
            var strProjects = window.localStorage.getItem("projects");
            var projects = undefined;
            if (strProjects != undefined) {
                projects = JSON.parse(strProjects);
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

        function goRegister() {
            if (vm.returnParam == null) {
                window.location.href = '#!/register';
            } else if (vm.returnParam == "callback") {
                if (mainLandUrl[0] == window.location.hostname) {
                   window.location.href = "http://" + mainAccountUrl[0] + "/#!/register?return=callback&type=" + vm.typeParam;
                }
                window.location.href = "#!/register?return=callback&type=" + vm.typeParam;
            }
        }
    }

})();
