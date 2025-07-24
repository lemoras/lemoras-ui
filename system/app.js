
const typeRoles = {
    None: 0,
    Root: 1,
    MerchantAdmin: 2,
    Admin: 3,
    Superuser: 4,
    User: 5,
    Member: 6
};

function GetTypeRoles(selfRoleId = 0) {
    selfRoleId = selfRoleId + 1;
    var tmpList = [];
    for (var i = selfRoleId; i < 7; i++) {
        tmpList.push({ text: Object.keys(typeRoles)[i], value: i });
    }
    return tmpList;
    // return [//{ text: Object.keys(typeRoles)[0], value: typeRoles.None}, none diye bir secenek olamaz
    //     //{ text: Object.keys(typeRoles)[1], value: typeRoles.Root},  bunlar eklenemez
    //     { text: Object.keys(typeRoles)[2], value: typeRoles.MerchantAdmin}, // bunlar eklenemez
    //     { text: Object.keys(typeRoles)[3], value: typeRoles.Admin}, 
    //     { text: Object.keys(typeRoles)[4], value: typeRoles.Superuser}, 
    //     { text: Object.keys(typeRoles)[5], value: typeRoles.User},
    //     { text: Object.keys(typeRoles)[6], value: typeRoles.Member}  
    // ];
}

(function () {
    'use strict';


    var $routeProviderReference;

    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'oc.lazyLoad', 'cgNotify'])
        .factory('util', function () {

            var arrayRemove = function (arr, value) {

                return arr.filter(function (ele) {
                    return ele.id !== value;
                });
            };

            return { arrayRemove: arrayRemove };
        })
        .factory('notification', function ($rootScope) {

            var showNotification = function (color, message) {

                if (message != undefined && message.includes("0x")) {
                    var msgCode = message.split(":")[0];
                    message = notifyCodeMsg.find(x => x.code == msgCode).detail[$rootScope.langKey];
                }

                $.notify({
                    icon: "now-ui-icons ui-1_bell-53",
                    message: message

                }, {
                    type: color,
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });

            };

            var pushWarningNotify = function (message, isLogin = false) {
                if (isLogin)
                    showNotification('warning', message);
                else
                    showNotification('warning', message);
            };

            var pushDangerNotify = function (message, isLogin = false) {
                if (isLogin)
                    showNotification('danger', message);
                else
                    showNotification('danger', message);
            };

            var pushSuccessNotify = function (message, isLogin = false) {
                showNotification('success', message);
            };

            var pushInfoNotify = function (message, isLogin = false) {
                if (isLogin)
                    showNotification('info', message);
                else
                    showNotification('info', message);
            };

            return { pushWarningNotify: pushWarningNotify, pushDangerNotify: pushDangerNotify, pushSuccessNotify: pushSuccessNotify, pushInfoNotify: pushInfoNotify };
        })
        .factory('Excel', function ($window) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
                format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
            return {
                tableToExcel: function (tableId, worksheetName) {
                    var table = $(tableId),
                        ctx = { worksheet: worksheetName, table: table.html() },
                        href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        })
        .factory('getjson', function ($http, notification, $cookies, $rootScope) {

            var getData = function (url, isNotNotify = false, giveSuccess = false) {
                addAuthHeader();
                return $http.get(url).
                    then(function (response) {
                        if (httpResponseCheckNotify(response, isNotNotify))
                            return responseInfo(response, giveSuccess);
                        return httpResponse(response, giveSuccess);
                    }, function (response) {
                        return httpResponse(response, giveSuccess);
                    }).catch(function (error) { angular.noop; });
            };

            var postData = function (url, data, isNotNotify = false, giveSuccess = false) {
                var globals = $cookies.getObject('globals');
                var isLogin = globals !== null && globals !== undefined;
                isLogin = window.localStorage.getItem("config") !== "";

                addAuthHeader();
                return $http.post(url, data).
                    then(function (response) {
                        if (httpResponseCheckNotify(response, isNotNotify))
                            return responseInfo(response, giveSuccess);
                        return httpResponse(response, giveSuccess, isLogin);
                    }, function (response) {
                        return httpResponse(response, giveSuccess, isLogin);
                    }).catch(function (error) { angular.noop; });
            };

            var putData = function (url, data, isNotNotify = false, giveSuccess = false) {
                addAuthHeader();
                return $http.put(url, data).
                    then(function (response) {
                        if (httpResponseCheckNotify(response, isNotNotify))
                            return responseInfo(response, giveSuccess);
                        return httpResponse(response, giveSuccess);
                    }, function (response) {
                        return httpResponse(response, giveSuccess);
                    }).catch(function (error) { angular.noop; });
            };

            var deleteData = function (url, isNotNotify = false, giveSuccess = false) {
                addAuthHeader();
                return $http.delete(url).
                    then(function (response) {
                        if (httpResponseCheckNotify(response, isNotNotify))
                            return responseInfo(response, giveSuccess);
                        return httpResponse(response, giveSuccess);
                    }, function (response) {
                        return httpResponse(response, giveSuccess);
                    }).catch(function (error) { angular.noop; });
            };

            var deleteDataBody = function (url, data, isNotNotify = false, giveSuccess = false) {
                addAuthHeader();
                return $http(angular.merge({}, {
                    'headers': {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                } || {}, {
                    method: 'DELETE',
                    url: url,
                    data: JSON.stringify(data)
                })).
                    then(function (response) {
                        if (httpResponseCheckNotify(response, isNotNotify))
                            return responseInfo(response, giveSuccess);
                        return httpResponse(response, giveSuccess);
                    }, function (response) {
                        return httpResponse(response, giveSuccess);
                    }).catch(function (error) { angular.noop; });
            };

            var addAuthHeader = function () {
                var globals = $cookies.getObject('globals') || {};
                var authToken = globals.currentUser == undefined
                    || globals.currentUser == null
                    || globals.currentUser == "" ? "" : globals.currentUser.authToken;

                $http.defaults.headers.common['Authorization'] = authToken;

                if (globals.currentUser == undefined || globals.currentUser == "" || globals.currentUser == null) {
                    var sectoken = $cookies.getObject('sectoken') || {};

                    var authSecToken = sectoken.authToken == undefined
                        || sectoken.authToken == null
                        || sectoken.authToken == "" ? "" : sectoken.authToken;

                    $http.defaults.headers.common['Authorization'] = authSecToken;

                    sectoken.createdTime == undefined
                        || sectoken.createdTime == null
                        || sectoken.createdTime == "" ? undefined : $rootScope.sectoken = { createdTime: sectoken.createdTime };
                }

                var userId = window.localStorage.getItem("fakeuserid");
                if (userId != null) {
                    $http.defaults.headers.common['UserId'] = userId;
                }
            };

            var httpResponse = function (response, giveSuccess = false, isLogin = false) {

                switch (response.status) {
                    case 200:
                        if (response.data.hasOwnProperty("status")
                            && response.data.hasOwnProperty("message")) {
                            if (!response.data.status) {
                                notification.pushWarningNotify(response.data.message, isLogin);
                            }
                        } else {
                            notification.pushSuccessNotify("0x11069:İşlem başarılı", isLogin);
                        }
                        break;
                    case 201:
                        notification.pushSuccessNotify("0x11069:İşlem başarılı", isLogin);
                        break;
                    case 204:
                        notification.pushSuccessNotify("0x11069:İşlem başarılı", isLogin);
                        break;
                    case 403:
                        notification.pushWarningNotify("0x11070:Erişim yetiniz bulunmamaktadır", isLogin);
                        break;
                    case 400:
                        notification.pushWarningNotify(response.data.message, isLogin);
                        break;
                    case 401:
                        notification.pushWarningNotify("0x11071:Giriş yapılmadığı için izin' verilememektedir", isLogin);
                        break;
                    case 404:
                        notification.pushInfoNotify("0x11072:Aranılan istek bulunulamadı", isLogin);
                        break;
                    case 500:
                        notification.pushDangerNotify("0x11073:Sunucuda bilinmeyen bir hata oluştu", isLogin);
                        break;
                    case 502:
                        notification.pushDangerNotify("0x11074:Hatalı ağ geçidi hatası oluştu", isLogin);
                        break;
                }

                if (response.status != 401) {
                    // expiration check and update 

                    if ($cookies.getObject('refreshTime') == null || $cookies.getObject('refreshTime') != undefined) {
                        var cookieRefreshExp = new Date();
                        var cookieGlobalsExp = new Date();

                        cookieRefreshExp.setMinutes(cookieRefreshExp.getMinutes() + 10);
                        cookieGlobalsExp.setMinutes(cookieGlobalsExp.getMinutes() + 20);

                        $cookies.putObject('refreshTime', {}, { expires: cookieRefreshExp, path: '/' });
                        $cookies.putObject('globals', $rootScope.globals, { expires: cookieGlobalsExp, path: '/' });
                    }
                }

                return responseInfo(response, giveSuccess);
            };

            var httpResponseCheckNotify = function (response, isNotNotify) {
                return isNotNotify && (response.status == 200 ||
                    response.status == 201 || response.status == 204);
            };

            var responseInfo = function (response, giveSuccess) {
                var isSuccess = (response.status == 200 ||
                    response.status == 201 || response.status == 204);

                if (!response.data.status)
                    isSuccess = false;

                return giveSuccess ? { isSuccess: isSuccess, data: response.data } : response.data;
            };


            return { getData: getData, postData: postData, putData: putData, deleteData: deleteData, deleteDataBody: deleteDataBody };
        })
        .factory('watchcontrol', function ($http, $cookies, $rootScope) {
            var log = function (value) {
                if (window.location.hostname == paramLocalDomain) {
                    console.log(value);
                }
            };

            return { log: log };
        })
        .config(config)
        .run(run);

    config.$inject = ['$compileProvider', '$routeProvider', '$ocLazyLoadProvider', '$qProvider'];
    function config($compileProvider, $routeProvider, $ocLazyLoadProvider, $qProvider) {

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|file|javascript|moz-extension|blob):/);

        $qProvider.errorOnUnhandledRejections(false);

        $routeProviderReference = $routeProvider;

        $ocLazyLoadProvider.config({
            'debug': false,
            'events': true,
            'modules': []
        });
    };


    run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$route', 'getjson', 'AuthenticationService', 'FlashService', 'watchcontrol'];
    function run($rootScope, $location, $cookies, $http, $route, getjson, AuthenticationService, FlashService, watchcontrol) {

        $rootScope.staticPage = { isNonHome: false };
        $rootScope.users = [];
        $rootScope.reloadUserInfo = "";

        $rootScope.mainLandUrl = mainLandUrl[0];

        $rootScope.langKey = window.localStorage.getItem("language");
        //window.localStorage.setItem("language", appConfig.language);

        $rootScope.changeLang = function (langKey) {
            $rootScope.langKey = langKey;
        };

        // $rootScope.navigateLink = function (link) {
        //     if (workLocalConfig) {
        //         function getRootDomain(hostname) {
        //             let parts = hostname.split(".");
        //             if (parts.length <= 2)
        //                 return hostname;

        //             parts = parts.slice(-3);
        //             if (['co','com'].indexOf(parts[1]) > -1)
        //                 return parts.join('.');

        //             return parts.slice(-2).join('.');
        //         };

        //         var rootDomain = getRootDomain(link);
        //         link = link.replace(rootDomain, mainLandUrl[0]);
        //     }
        //     window.location.replace(link);
        // };

        $rootScope.gotoAccount = function () {
            window.location.replace("http://" + mainAccountUrl[0]);
        };

        $rootScope.checkMenuRole = function (allows) {

            if (allows === undefined) return false;

            return allows.includes(globals.currentUser.parsedRoleId);
        };

        $rootScope.config = undefined;
        $rootScope.public_config = undefined;

        $rootScope.navSelected = 0;

        $rootScope.contentTitle = '';
        $rootScope.chooseUser = { userId: "", roleId: 0 };

        $rootScope.changeReloadUser = function (e, w) {
            $rootScope.users.filter(function (user) {
                if ((user.nickname) == e) {
                    $rootScope.chooseUser = user;
                }
            });
        };

        $rootScope.searchKeyup = function (event) {
            if (event.keyCode == 13) {
                $rootScope.changeUser();
            }
        };

        $rootScope.changeUser = function () {
            var isReturn = true;
            $rootScope.users.filter(function (user) {
                isReturn = !(user.nickname == $rootScope.chooseUser.nickname);
            });
            if (isReturn) {
                return;
            }
            AuthenticationService.ChangeUserProfile($rootScope.chooseUser, (function (res) {
                if (res.status) {
                    FlashService.WriteLocal(false, res.message);
                    var template = window.localStorage.getItem("template");
                    var app = window.localStorage.getItem("app");
                    window.location.href = '../../../apps/' + app + "/" + template + '/index.html';
                };
            }));
        };

        $rootScope.navSelect = function (index, item, xValue) {
            $rootScope.navSelected = index;

            if (xValue === undefined) {
                $rootScope.contentTitle = item.value;
            }
            else {
                $rootScope.contentTitle = item.value + '  >  ' + xValue;
            };

            watchcontrol.log(item.link);
        };

        $rootScope.setNav = function () {
            $rootScope.navSelected = 0;
            $rootScope.contentTitle = '';
        };

        $rootScope.loginbyDomain = function (domain) {
            
            if (domain == mainAccountUrl[0]) {
                $rootScope.gotoAccount();
            }

            var externalURL = "http://" + mainAccountUrl[0] + "/#!/applications?type=loginbydomain&domain=" + domain;
            window.location.replace(externalURL);
            return;
        };

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

        if ($location != undefined || $location != null) {
            var urlParams = $location.search();
            if (urlParams.type == "logoutAuth") {

                var strSessions = window.localStorage.getItem("sessions") || "";

                if (strSessions == "" && (urlParams.sessions != "" && urlParams.sessions != undefined)) {
                    strSessions = urlParams.sessions;
                }

                AuthenticationService.ClearCredentials();

                var strOriginReturn = "";
                if (urlParams.originReturn != undefined && urlParams.originReturn != null) {
                    strOriginReturn = "&originReturn=" + urlParams.originReturn;
                    urlParams.return = urlParams.originReturn;
                }

                if (strSessions != "") {
                    var sessions = JSON.parse(strSessions);

                    sessions = sessions.filter(x => !mainAccountUrl.includes(x) && x != urlParams.return);

                    if (sessions.length == 0) {
                        window.location.replace("http://" + urlParams.return);
                        return;
                    };

                    var eDomain = sessions[0];

                    sessions = sessions.filter(x => x != eDomain);
                    var newStrSession = JSON.stringify(sessions);

                    var externalURL = "http://" + eDomain + "/#!?return=" + window.location.hostname + "&type=logoutAuth&sessions=" + newStrSession + strOriginReturn;

                    window.location.replace(externalURL);
                    return;
                }

                window.location.replace("http://" + urlParams.return);
                return;
            }
        }

        if ($rootScope.globals.currentUser) {

            var urlParams = $location.search(); // daha once bu olmadan calisiyordu ben yinede koydum
            if (urlParams.type == "handleLogin") {

                var handleLogin = JSON.parse(urlParams.handleLogin);

                AuthenticationService.SetSession(handleLogin.returnUrl);

                var returnString = JSON.stringify(handleLogin.returnData);

                window.location.replace("http://" + handleLogin.returnUrl + "/#!/login?return=internal&type=" + returnString);

                return;
            }

            if (urlParams.type == "loginbydomain") {

                window.localStorage.setItem("loginbydomain", urlParams.domain);
            }

            if (urlParams.type == "triggerApplicationsHash") {

                window.localStorage.setItem("triggerApplicationsHash", "#!/applications");
            }

            // expiration

            if ($cookies.getObject('refreshTime') == null || $cookies.getObject('refreshTime') != undefined) {
                var cookieRefreshExp = new Date();
                var cookieGlobalsExp = new Date();

                cookieRefreshExp.setMinutes(cookieRefreshExp.getMinutes() + 1);
                cookieGlobalsExp.setMinutes(cookieGlobalsExp.getMinutes() + 30);

                $cookies.putObject('refreshTime', {}, { expires: cookieRefreshExp, path: '/' });
                $cookies.putObject('globals', $rootScope.globals, { expires: cookieGlobalsExp, path: '/' });
            }

            // expire 7 gun sonra sona erer otomatikmen silinir, eger her giriste ilave sure eklenecek ise o kod satiri burada olacak

            $rootScope.photoUrl = $rootScope.globals.currentUser.photoUrl;
            $rootScope.nickname = $rootScope.globals.currentUser.nickname;

            // var rigthRoleId = $rootScope.globals.currentUser.roleId == $rootScope.globals.currentUser.parsedRoleId
            //     ? $rootScope.globals.currentUser.roleId : $rootScope.globals.currentUser.parsedRoleId;

            $rootScope.isMerchantAdmin = typeRoles.MerchantAdmin === $rootScope.globals.currentUser.parsedRoleId;
            $rootScope.isAdmin = typeRoles.Admin === $rootScope.globals.currentUser.parsedRoleId;
            $rootScope.isSuperuser = typeRoles.Superuser === $rootScope.globals.currentUser.parsedRoleId;

            $rootScope.hasId = $rootScope.globals.currentUser.hasId;

            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.authToken;
            var result = window.localStorage.getItem("config");

            if (result === null) {
                window.location.replace("#!/home");
            }
            else {
                var config = JSON.parse(result).config;
                $rootScope.config = config;
                $rootScope.public_config = config;
                document.getElementById("configTitle").innerHTML = config.titleName[$rootScope.langKey];
                setRoute(config.route);
                if ($rootScope.isMerchantAdmin || $rootScope.isAdmin || $rootScope.isSuperuser || $rootScope.hasId) {
                    var getUrl = zoeURL + 'system/member';
                    getjson.getData(getUrl, true).then(function (res) {
                        $rootScope.users = res.members;
                        if ($rootScope.hasId) {
                            if ($rootScope.users == undefined) { // buna gerek varmi  
                                $rootScope.users = [];
                            }
                            $rootScope.users.push($rootScope.globals.hasIdUser)
                        }
                    });
                };

                var path = window.location.pathname.split('/')[1];

                if ("apps" !== path) {
                    var template = window.localStorage.getItem("template");

                    if (template === null) {
                        window.location.replace("./index.html#!/home");
                    }
                    else {
                        var app = window.localStorage.getItem("app");
                        window.location.replace("./apps/" + app + "/" + template + "/index.html");
                    }
                } else {
                    document.getElementById("configDisplay").style.display = "";
                }
            }
        } else {
            $rootScope.public_config = public_data.config;
            $rootScope.public_config.navigation = public_data.config.template_configs[0]; // !important
            document.getElementById("configTitle").innerHTML = public_data.config.titleName[$rootScope.langKey];
            setRoute(public_data.config.route);
        }

        var strApps = window.localStorage.getItem("lemorasApplications");

        $rootScope.lemorasApps = JSON.parse(strApps);

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            var nonPrivatePages = $rootScope.public_config.route.pages.filter(page => !page.isPrivate)
                .map(x => x.routeName);

            var restrictedPage = $.inArray($location.path(), nonPrivatePages) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/home').replace(); // if next resticted page navigate to default.html home page or next page
            }
        });


        function setRoute(data) {

            var j = 0, currentRoute;

            var def = data.default;

            var controllers = [];

            for (; j < data.pages.length; j++) {

                currentRoute = data.pages[j];

                controllers.push('../../' + currentRoute.controllerUrl);

                var template = window.localStorage.getItem("Xtemplate");

                if (template == undefined || template == null || template == "") {
                    template = "default";
                }

                var appName = window.localStorage.getItem("app");

                if (appName == undefined || appName == null || appName == "") {
                    appName = "default";
                }

                //var ctrlPath = [];
                //ctrlPath.push( '../../' + currentRoute.controllerUrl);

                $routeProviderReference.when(currentRoute.routeName, {
                    // views/auth/login.view.html
                    // apps/app/login.html
                    templateUrl: '../../../apps/' + appName + "/" + template + "/" + currentRoute.templateUrl,
                    controller: currentRoute.controllerName,
                    controllerAs: currentRoute.controllerAsName,
                    resolve: {
                        loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(controllers);
                        }]
                    }
                });
            };

            $routeProviderReference.otherwise({ redirectTo: def });

            $route.reload();
        };
    };


    angular
        .module('app').filter('startFrom', function () {
            return function (input, start) {
                if (input === undefined)
                    return 50;

                start = +start;
                return input.slice(start);
            }
        });

})();
