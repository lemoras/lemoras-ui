(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'getjson', '$cookies', '$rootScope', '$cookieStore', '$location'];
    function AuthenticationService($http, getjson, $cookies, $rootScope, $cookieStore, $location) {
        var service = {};

        service.ExternalLogin = ExternalLogin;
        service.InternalLogin = InternalLogin;
        service.Login = Login;
        service.BuildToken = BuildToken;
        service.CreateAccount = CreateAccount;
        service.CreateFullAccount = CreateFullAccount;
        service.SetCredentials = SetCredentials;
        service.ChangeUserProfile = ChangeUserProfile;
        service.ClearCredentials = ClearCredentials;
        service.GetUserApp = GetUserApp;
        service.GetConfig = GetConfig;
        service.FakeLogin = FakeLogin;
        service.ProfileLogin = ProfileLogin;
        service.FakeCreateAccount = FakeCreateAccount;
        service.GetConfigs = GetConfigs;
        service.SetSession = SetSession;
        service.GetSecTokenFromScope = GetSecTokenFromScope;
        service.SetSecToken = SetSecToken;


        var authServiceUrl = zoeURL + "security/";

        var isFakeLogin = false;

        var loadedConfigs = [];

        return service;

        function GetUserApp(callback) {
            callback($rootScope.applications);
        }

        function ProfileLogin(account, firstTakenToken, callback) {

            var res = {
                status: true,
                message: null,
                account: { nickname: account.nickname, email: account.email, token: firstTakenToken, photoUrl: account.photoUrl, firstName: account.firstName, lastName: account.lastName, hasId: null, appId: 0, roleId: 6, merchantId: "" },
            };

            service.SetCredentials(res.account);
            service.GetConfig(res.account, function (configData) {
                res.message = configData;
                callback(res);
            });
        }

        function FakeLogin(email, password, fakeAppId, callback) {

            isFakeLogin = true;

            var fakeToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsZW1vcmFzIiwiaWF0IjoxNTg";
            fakeToken = fakeToken + "4OTUyMjk1LCJleHAiOjE5MDQ0ODUwOTUsImF1ZCI6ImtpbWxpay5vbmxpbmUiLCJzdWIi";
            fakeToken = fakeToken + "OiJvbnVyQHlhc2FyLmVtYWlsIiwiR2l2ZW5OYW1lIjoiT251ciIsIlN1cm5hbWUiOiJZYX";
            fakeToken = fakeToken + "NhciIsIkVtYWlsIjoib251ckB5YXNhci5lbWFpbCIsIlJvbGUiOiJTb2x1dGlvbiBBcmNoa";
            fakeToken = fakeToken + "XRlY3QifQ.GsruHtt1Sk1tlRJPBEmnNFuMJ_jVPr_DK84mDgyhBZ0";

            var res = {
                status: true,
                message: null,
                account: { nickname: "fake", email: "fake@localhost", token: fakeToken, photoUrl: null, firstName: "Admin", lastName: "Lemoras", hasId: null, appId: fakeAppId, roleId: 6, merchantId: "16f91fa6-de66-4000-8742-9ece0b312db4" },
            };

            service.SetCredentials(res.account);
            service.GetConfig(res.account, function (configData) {
                res.message = configData;
                callback(res);
            });
        }

        function Login(email, password, callback, returnUrl = "", appIds = [], projects = undefined, authToken = "") {

            email = email.toLowerCase();
            getjson.postData(authServiceUrl + 'authenticate', { email: email, password: password, token: authToken })
                .then(function (res) {
                    if (res.status) {

                        if ((new Date("09/28/2018")).getDate() == new Date(res.account.createdAt).getDate()) {
                            res.account.appCount = 0;
                            res.account.appId = 0;
                            res.account.roleId = 1;
                            res.account.isRoot = true;
                            res.account.merchantId = "00000000-0000-0000-0000-000000000000";
                            callback(res);
                            return;
                        }

                        var appList = res.account.appList.split(",");

                        SetSecToken(res.account.token);

                        if (res.account.appList == "" && appList.length == 1) {
                            res.data = { message: res.message };
                            res.account.appCount = 0;
                            if (returnUrl == "" && appIds.length == 0 && projects == undefined) {
                                callback(res);
                            }
                            //return;// TODO:inspect just acccount profilelogin
                        }

                      res.account.appCount = appList.length;

                        if (appList.length >= 1) {

                            var appRoleList = [{ domains:undefined, record: false, appId: 0, roleId: 0, merchantId: 0, appName: "", projectId: 0, projectName: "", icon:"" }]
                            appRoleList.shift();
                            appList.forEach(function (app) {
                                var appRole = app.split(":");
                                if (appRole.length == 5) {
                                    appRoleList.push({
                                        appId: parseInt(appRole[0].trim()),
                                        roleId: parseInt(appRole[1].trim()),
                                        merchantId: appRole[2].trim(),
                                        appName: "",
                                        projectId: parseInt(appRole[3].trim()),
                                        projectName: appRole[4].trim(),
                                        record:true,
                                        domains:undefined,
                                        icon: "./../../../system/assets/appicon/icon.png"
                                    });
                                }
                            });

                            if (returnUrl != "" && appIds.length > 0 && !mainLandUrl.includes(returnUrl)) {
                                appRoleList = appRoleList.filter(x => projects.map(d=> d.projectId).includes(x.projectId) && appIds.map(y => y.appId).includes(x.appId) && appIds.map(y => y.type_id).includes(x.roleId != typeRoles.Member ? 5 : typeRoles.Member));
                            }

                            // var merchantCheck = toFindDuplicates(appRoleList.map(x => x.merchantId)); // appId ile ayni uygualamay ait farkli merchantlar var mi 

                            // if (merchantCheck) {
                            //     // hata firlat aslinda merchant check degil, bir kisi ayni app e birden fazla rolu olamaz 
                            //     //kontrollu zaten backend de o yuzden zaten olamaz yani gereksiz kontrol
                            // }

                            var configParamAppIds = [];

                            if (appIds.length > 0) {
                                configParamAppIds = appIds.map(x => x.appId);
                            };

                            GetConfigs(returnUrl, configParamAppIds, function (configData) {

                                var filteredConfigs = configData.filter((c) => appRoleList.map(x => x.appId).includes(c.appId));

                                if (returnUrl != "" && appIds.length > 0 && !mainLandUrl.includes(returnUrl)) {
                                    filteredConfigs = filteredConfigs.filter(x => x.domains.includes(returnUrl));
                                }

                                var removeAppRoleList = [];
                                appRoleList.forEach(function (x, index) {

                                    var configTypeId = x.roleId != typeRoles.Member ? 5 : typeRoles.Member;

                                    var appConfig = filteredConfigs.filter(c => c.appId == x.appId && c._id == configTypeId)[0];

                                    if (appConfig != undefined && appConfig != null) {
                                        x.appName = appConfig.app; // appName on config.json
                                        x.domains = appConfig.domains;
                                        var iconApp = appConfig.app.replace("-panel", "");
                                        x.icon = x.icon.replace("/icon", "/" + iconApp);
                                        if (appConfig._id != typeRoles.Member) {
                                            x.projectName = x.projectName + " -- control panel"
                                        }

                                        appRoleList[index] = x;
                                    } else {
                                        removeAppRoleList.push(x);
                                    }

                                });

                                appRoleList = appRoleList.filter(x => !removeAppRoleList.includes(x));

                                if (appRoleList.length < appIds.length && returnUrl != "" && !mainLandUrl.includes(returnUrl)) {

                                    var tmpConfigs = configData.filter(x => appIds.map(a => a.appId).includes(x.appId) && x.domains.includes(returnUrl));
                                    var tmpAppIDs = appIds;
                                    tmpAppIDs.forEach(function (x, index) {

                                        appRoleList.forEach(function (y) {
                                            if (x.appId == y.appId && (y.roleId != typeRoles.Member ? 5 : typeRoles.Member) == x.type_id) {
                                                appIds.splice(index, 1);
                                            }
                                        });
                                    });

                                    tmpConfigs.forEach(function (x) {

                                        var appConfigs = appIds.filter(c => c.appId == x.appId && c.type_id == x._id);

                                        appConfigs.forEach(function(appConfig){

                                            projects.forEach(function(xProject) {

                                                if (appConfig.type_id == typeRoles.Member && xProject.appId == appConfig.appId) {

                                                    var checkDoplicationApp = appRoleList.find(cd=> cd.projectId == xProject.projectId 
                                                        && cd.appId == xProject.appId && cd.merchantId == xProject.merchantId && cd.roleId == typeRoles.Member)

                                                    if (checkDoplicationApp == ""|| checkDoplicationApp == undefined || checkDoplicationApp == null) {

                                                        appRoleList.push({
                                                            appId: appConfig.appId,
                                                            roleId: appConfig.type_id,
                                                            merchantId: "",
                                                            appName: x.app,
                                                            projectId: xProject.projectId,
                                                            projectName: "NEW -- " + x.app,
                                                            record: false,
                                                            domains: x.domains,
                                                            icon:"./../../../system/assets/appicon/"+ x.app +".png"
                                                        });
                                                    }
                                                }
                                            });
                                        })
                                    });
                                    
                                    res.account.appCount = appRoleList.length;
                                }

                                $rootScope.applications = appRoleList;

                                if (appRoleList.length == 1 && appRoleList.filter(f=> !f.record).length == 0) {

                                    res.account.appCount = appRoleList.length;

                                    res.account.appId = appRoleList[0].appId;
                                    res.account.roleId = appRoleList[0].roleId;
                                    res.account.merchantId = appRoleList[0].merchantId;
                                    res.account.domains = appRoleList[0].domains;
                                }

                                callback(res);
                                return;
                            });

                        }
                    } else {
                        callback(res);
                    }
                });
        }

        function BuildToken(account, callback) {

            if (account.isRoot) {
                account.lastLoginDate = account.createdAt;

                var configURL = baseURL + "/system/root-config.json";

                window.localStorage.setItem("loadconfig", configURL);

                service.SetCredentials(account, false);
                service.GetConfig(account, function (configData) {
                    var res = { status: true };
                    res.message = configData;
                    callback(res);
                });
                return;
            }

            getjson.postData(authServiceUrl + 'authenticate', { appId: account.appId, roleId: account.roleId, merchantId: account.merchantId })
                .then(function (res) {
                    if (res.status) { // bu ve ust bilgiler set credentials parametlereleri duzgun bir sekilde duzenlenmeli
                        account.token = res.account.token;
                        account.lastLoginDate = res.account.lastLoginDate;
                        res.account = account;
                        service.SetCredentials(account, false);
                        service.GetConfig(account, function (configData) {
                            res.message = configData;
                            var roleCaseDomain = res.account.roleId == typeRoles.Member ? "": paramLocalAdminSubdomain;

                            var tmpAppDomains = res.account.domains.filter(g=> !mainLandUrl.includes(g) && !mainAccountUrl.includes(g));
                            if (tmpAppDomains != undefined && tmpAppDomains.length > 0 && mainLandUrl.includes(window.location.hostname)) {
                                var tmpAppDomain ="";

                                if (roleCaseDomain == paramLocalAdminSubdomain) {
                                    tmpAppDomain = tmpAppDomains.find(f=> f.includes(paramLocalAdminSubdomain)  && f.includes(paramLocalDomain) && workLocalConfig) || tmpAppDomains[0];
                                }else {
                                    tmpAppDomain = tmpAppDomains.find(f=> !f.includes(paramLocalAdminSubdomain)  && f.includes(paramLocalDomain) && workLocalConfig) || tmpAppDomains[0];
                                }

                                service.SetSession(tmpAppDomain);
                            }
                            if (tmpAppDomains != undefined && tmpAppDomains.length > 0 && mainAccountUrl.includes(window.location.hostname)) {
                                var tmpAppDomain ="";
                                if (roleCaseDomain == paramLocalAdminSubdomain) {
                                    tmpAppDomain = tmpAppDomains.find(f=>  f.includes(paramLocalAdminSubdomain)  && f.includes(paramLocalDomain) && workLocalConfig) || tmpAppDomains[0];
                                }else {
                                    tmpAppDomain = tmpAppDomains.find(f=>  !f.includes(paramLocalAdminSubdomain)  && f.includes(paramLocalDomain) && workLocalConfig) || tmpAppDomains[0];
                                }
                                service.SetSession(tmpAppDomain);
                            }
                            callback(res);
                        });
                    } else {
                        callback(res);
                    }
                });
        }


        function ExternalLogin(email, password, hostname, appIds, projects, callback, authToken = "") {
            Login(email, password, function (res) {
                callback(res);
            }, hostname, appIds, projects, authToken);
        }

        function CreateAccount(email, password, callback) {
            CreateFullAccount({ email: email, password: password }, callback)
                .then(function (res) {
                    callback(res);
                });
        }

        function CreateFullAccount(account, callback) {
            account.email = account.email.toLowerCase();
            getjson.postData(authServiceUrl + 'account', account)
                .then(function (res) {
                    callback(res);
                });
        }

        function FakeCreateAccount(callback) {
            isFakeLogin = true;

            callback({ success: true, message: "" });
        }

        function getParseRoleId(roleId) {
            return parseInt(String.fromCharCode(String(roleId).charCodeAt(0)));
        }

        function SetCredentials(account, hasId = false, hasIdUser = {}) {

            ClearSecToken();

            var token = account.token;
            var authdata = Base64.encode(account.email + ':' + account.roleId + ':' + account.appId + ':' + account.merchantId);

            var parsedRoleId = getParseRoleId(account.roleId);

            $rootScope.globals = {
                currentUser: {
                    email: account.email,
                    authdata: authdata,
                    roleId: account.roleId,
                    parsedRoleId: parsedRoleId,
                    appId: account.appId,
                    merchantId: account.merchantId,
                    photoUrl: account.photoUrl,
                    nickname: account.nickname,
                    hasId: hasId,
                    authToken: 'Bearer ' + token,
                    pureToken: token,
                    lastLoginDate: account.lastLoginDate,
                    createdTime: new Date()
                },
                hasIdUser: hasIdUser
            };

            setUserIForFake(1);

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setMinutes(cookieExp.getMinutes() + 20);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp, path: '/' });
        }

        function SetSecToken(token) {
            ClearSecToken();
            $rootScope.sectoken = {
                authToken: 'Bearer ' + token,
                createdTime: new Date()
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setMinutes(cookieExp.getMinutes() + 1);
            $cookies.putObject('sectoken', $rootScope.sectoken, { expires: cookieExp });
        }

        function GetSecTokenFromScope() {
            return $rootScope.sectoken.authToken;
        }

        function ClearSecToken() {

            $rootScope.sectoken = {};
            $cookies.remove('sectoken');
        }

        function setUserIForFake(userId) {
            if (isFakeLogin) {
                window.localStorage.setItem("fakeuserid", userId);
                $http.defaults.headers.common['UserId'] = userId;
            }
        }

        function ClearCredentials() {
            //$rootScope.Config = {};
            isFakeLogin = false;
            $rootScope.config = undefined;
            $rootScope.globals = {};
            $rootScope.sectoken = {};
            $cookies.remove('refreshTime');
            $cookies.remove('refreshTime', { path: '/' });
            $cookies.remove('globals');
            $cookies.remove('globals', { path: '/' });
            $cookies.remove('sectoken');
            window.localStorage.removeItem("fakeuserid");
            window.localStorage.removeItem("authorization");
            window.localStorage.removeItem("config");
            window.localStorage.removeItem("app");
            window.localStorage.removeItem("appId");
            window.localStorage.removeItem("configType");
            window.localStorage.removeItem("merhantId");
            window.localStorage.removeItem("template");
            window.localStorage.removeItem("sessions");
            window.localStorage.removeItem("lemorasApplications");
            window.localStorage.removeItem("loginbydomain");
            $http.defaults.headers.common.Authorization = 'Bearer';

            angular.forEach($cookies, function (v, k) {
                $cookieStore.remove(k);
                $cookieStore.remove('globals', { path: '/' });
            });
        }

        function SetSession(domain) {
         
            var strSessions = window.localStorage.getItem("sessions") || "";
            if (strSessions != "") {
                
                var sessions = JSON.parse(strSessions);
       
                var checkSession = sessions.find(x=> x == domain);

                if (checkSession == undefined || checkSession == null || checkSession == "" || checkSession == "undefined") {
                    sessions.push(domain);
                    var modifyStrSession = JSON.stringify(sessions);
                    window.localStorage.setItem("sessions", modifyStrSession);
                }
            }else {
                var newSessions = [];
                newSessions.push(domain);
                var newStrSession = JSON.stringify(newSessions);
                window.localStorage.setItem("sessions", newStrSession);
            }
        }

        function GetConfig(account, callback) {

            var urlParams = $location.search();
            var template = urlParams.template;
            var customTemplate = template;

            if (template == null) {
                template = "w_default";
                var pcTemplate = window.localStorage.getItem("thispctemplate");
                if (pcTemplate !== null) {
                    template = pcTemplate;
                    customTemplate = pcTemplate;
                }
            }

            var parsedRoleId = getParseRoleId(account.roleId);

            var configTypeId = parsedRoleId != typeRoles.Member ? 5 : typeRoles.Member;

            if (parsedRoleId == 1) {
                configTypeId = parsedRoleId;
            }

            GetConfigs("", [account.appId], function (configs) {

                var filteredConfigs = configs.filter(x => x._id == configTypeId && x.appId == account.appId);

                var configData = filteredConfigs[0];
                var object = undefined;

                try {
                    object = JSON.parse(configData.data);
                } catch (error) {
                    ClearCredentials();
                    alert("xx:ERROR!!");
                    window.location.replace("http://" + mainAccountUrl[0]);
                    return;
                }

                if (configData.template != "" &&
                    configData.template != null &&
                    configData.template != undefined &&
                    (customTemplate == ""
                        || customTemplate == null
                        || customTemplate == undefined)) {
                    template = configData.template;
                    window.localStorage.setItem("Xtemplate", template);
                    window.localStorage.setItem("app", configData.app);
                    window.localStorage.setItem("configType", configTypeId);
                    window.localStorage.setItem("appId", account.appId);
                } else {
                    if (!object.config.template_configs
                        .map(x => x.template_name)
                        .includes(customTemplate)) {
                        template = configData.template;
                        window.localStorage.setItem("Xtemplate", template);
                        window.localStorage.setItem("app", configData.app);
                        window.localStorage.setItem("configType", configTypeId);
                        window.localStorage.setItem("appId", account.appId);
                        // window.localStorage.setItem("template", pTemplate); 
                        // window.localStorage.setItem("thispctemplate", pTemplate);
                    }
                }
                var template_configs = object.config.template_configs.filter(x => x.template_name == template);
                object.config.template = template;
                object.config.app = configData.app;
                object.config.appId = account.appId;
                object.config._id = account.roleId;
                object.config.merchantId = account.merchantId;
                object.config.navigation = template_configs[0];

                loadedConfigs = [];
                callback(object);
            });
        }

        function GetConfigs(returnUrl, appIds = [], callback) {
            // var returnUrl = "";
            if (loadedConfigs.length > 0) {
                callback(loadedConfigs);
            } else {
                if (window.location.hostname == paramLocalDomain || true) {
                    var configURL = window.localStorage.getItem("loadconfig");
                    getjson.getData(configURL, true)
                        .then(function (res) {
                            var filteredConfigs = res.filter(x => x._id > 0);
                            //loadedConfigs = filteredConfigs;

                            if (returnUrl != "") {
                                filteredConfigs = filteredConfigs.filter(x => x.domains.includes(returnUrl));
                            }

                            if (appIds.length > 0) {
                                filteredConfigs = filteredConfigs.filter(x => appIds.includes(x.appId));
                            }

                            callback(filteredConfigs);
                        });
                }
            }
        }

        function InternalLogin(returnData, callback) {
            returnData.status = true;

            window.localStorage.setItem("template", returnData.template);
            window.localStorage.setItem("app", returnData.appName);
            window.localStorage.setItem("Xtemplate", returnData.xTemplate);
            window.localStorage.setItem("language", returnData.language);
            window.localStorage.setItem("configType", returnData.configTypeId);
            window.localStorage.setItem("appId", returnData.appId);

            service.SetCredentials(returnData.account);
            service.GetConfig(returnData.account, function (configData) {
                returnData.message = configData;
                callback(returnData);
            });
        }

        function ChangeUserProfile(user, callback) {

            if ($rootScope.globals.hasIdUser.email == user.email) {
                var hasIdUser = $rootScope.globals.hasIdUser;
                hasIdUser.token = hasIdUser.pureToken;
                service.ClearCredentials();
                service.SetCredentials(hasIdUser);
                service.GetConfig(hasIdUser, function (configData) {
                    var res = {
                        message: configData,
                        status: true
                    }
                    callback(res);
                });
            } else {

                getjson.postData(authServiceUrl + 'authenticate/change', { userId: user.userId, roleId: user.roleId })
                    .then(function (res) {
                        if (res.status) {

                            var currentUser = $rootScope.globals.currentUser;

                            var hasIdUser = {};
                            if (currentUser.hasId) {
                                hasIdUser = $rootScope.globals.hasIdUser
                            }

                            service.ClearCredentials();

                            res.account.email = user.email;
                            res.account.nickname = user.nickname;
                            res.account.appId = user.appId;
                            res.account.merchantId = user.merchantId;
                            res.account.roleId = user.roleId;
                            res.account.photoUrl = user.photoUrl
                            res.account.hasId = true;

                            service.SetCredentials(res.account, true, currentUser.hasId ? hasIdUser : currentUser);
                            service.GetConfig(res.account, function (configData) {
                                res.message = configData;
                                callback(res);
                            });
                        } else {
                            callback(res);
                        }
                    });
            }
        }
    }

    function toFindDuplicates(arry) {
        let resultToReturn = false;
        resultToReturn = arry.some((element, index) => {
            return arry.indexOf(element) !== index
        });
        return resultToReturn
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
