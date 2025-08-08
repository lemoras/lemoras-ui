var mainLandUrl = [];
var mainAccountUrl = [];

var paramMainLandAppName = "mainland";
var paramAccountAppName = "account";

var paramLocalDomain = "localhost";
var paramLocalAccountDomain = "account.localhost";
var paramLocalAdminSubdomain = "admin";

var workLocalConfig = true;


var zoeURL = "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-e58721af-3523-46d2-aed8-6fa95c0711ea/";

if (window.location.hostname.includes(paramLocalDomain) && workLocalConfig) {
    zoeURL = "http://" + paramLocalDomain + ":8080/";
}

var str = window.location.host;

var protocol = location.protocol;

var baseURL = protocol + "//" + str;

var path = window.location;

let type_id = -1;

var config = window.localStorage.getItem("config");
var app = window.localStorage.getItem("app");
var appId = window.localStorage.getItem("appId");
var configType = window.localStorage.getItem("configType");

var appName = "";
if (config !== null && app != null
    && (document.cookie !== "" && document.cookie !== undefined && document.cookie !== null) && configType != null) {
    type_id = configType; //5; // = role
    appName = app;
} else {

    var Xtemplate = window.localStorage.getItem("Xtemplate");
    var thispctemplate = window.localStorage.getItem("thispctemplate");

    if (thispctemplate != null && thispctemplate != undefined && thispctemplate != ""
        && thispctemplate != Xtemplate && type_id == -1) {
        window.localStorage.setItem("Xtemplate", thispctemplate);
        window.location.replace("../../../apps/" + app + "/" + thispctemplate + "/default.html");
    }
}

let public_data;

let configURL = baseURL + "/system/config.json";

if (window.location.hash == "#!/loadrootconfig") {
    configURL = baseURL + "/system/root-config.json";
}

if ((window.location.hash.includes("#!/login?return=internal&type=")
    || (window.location.hash.includes("#!?return=") && window.location.hash.includes("&type=logoutAuth&sessions="))
    || window.location.hash.includes("#!/login?return=callback&type=")
    || window.location.hash.includes("#!/login")
    || window.location.hash.includes("#!/register")
    || window.location.hash.includes("#!/login?return=handleCallback&type=handleLogin&handleLogin=")
    || window.location.hash.includes("#!/login?return=triggerCallback&email=")
    || window.location.hash.includes("#!/applications?type=loginbydomain&domain=")
    || window.location.hash.includes("#!/home")
    || window.location.hash.includes("#!/applications")
) && workLocalConfig && window.location.hostname.includes(paramLocalDomain)) {
    configURL = baseURL + "/system/local-config.json";
}

if (window.location.hostname.includes(paramLocalDomain) && window.location.hash == "" && workLocalConfig) {
    window.location.hash = "#!/loadlocalconfig";
}

if (window.location.hash == "#!/loadlocalconfig") {
    configURL = baseURL + "/system/local-config.json";
}

if (type_id != -1) {
    var tempConfig = window.localStorage.getItem("loadconfig");
    if (tempConfig !== undefined && tempConfig !== "" && tempConfig !== null) {
        configURL = tempConfig;
    }
}

window.localStorage.setItem("loadconfig", configURL);

let httpRequest = new XMLHttpRequest(); // asynchronous request

httpRequest.open("GET", configURL, true);
httpRequest.send();
httpRequest.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        if (this.status === 404) {

            if (window.location.hash == "#!/init") {
                return;//window.stop();
            }

            window.location.replace("../../../apps/root/w_notemp/default.html#!/init");
            return;
        }

        // when the request has completed
        // baslangicta login parametresi olmadigi icin dogrudan type_id 1 i aliyor
        var jsonObject = JSON.parse(this.response);

        var filteredConfigs = [];

        if (type_id == -1) {
            filteredConfigs = jsonObject.filter(x => (x._id == type_id)
                && x.domains.includes(window.location.hostname));
        } else {
            filteredConfigs = jsonObject.filter(x => (x._id == type_id)
                && x.appId == appId);
        }

        try {
            var tmpMainLandUrl = jsonObject.filter(x => x._id == -1 && x.app == paramMainLandAppName)[0];
            if (tmpMainLandUrl !== undefined) {
                mainLandUrl = jsonObject.filter(x => x._id == -1 && x.app == paramMainLandAppName)[0].domains;
                mainLandUrl[0] = mainLandUrl.find(f => f == paramLocalDomain && workLocalConfig) || mainLandUrl[0];
            }
            var tmpMainAccountUrl = jsonObject.filter(x => x._id == -1 && x.app == paramAccountAppName)[0];
            if (tmpMainAccountUrl !== undefined) {
                mainAccountUrl = jsonObject.filter(x => x._id == -1 && x.app == paramAccountAppName)[0].domains;
                mainAccountUrl[0] = mainAccountUrl.find(f => f == paramLocalAccountDomain && workLocalConfig) || mainAccountUrl[0];
            }
        } catch (error) {
            console.error(error);
        }

        if (type_id == -1) {
            var domainApps = jsonObject.filter(x => (x._id != type_id) // type_id = 2 musteri control paneli aslinda control paneli degil, 5 ise esas kontrol paneli  
                && x.domains.includes(window.location.hostname)); //  && x.domains.includes(mainLandUrl)); ? auth service icerisinde cagriliyor orda kullaniliyor
            var appIds = domainApps.map(x => { return { type_id: x._id, appId: x.appId } }); //, domain: window.location.hostname }; });
            window.localStorage.setItem("domainApps", JSON.stringify(appIds));
        }

        if (appName != "") {
            filteredConfigs = filteredConfigs.filter(x => x.app == appName);
        }

        var appConfig = filteredConfigs[0];
        var localeLang = navigator.language.split('-')[0];

        if (appConfig == undefined) { // special case, normally; throw except just on work on local, page refresh go load local config code blog handle
            window.location.href = window.location.origin;
        }

        localeLang = !appConfig.language.includes(localeLang)
            ? appConfig.language[0] : localeLang;

        window.localStorage.setItem("language", localeLang);
        window.localStorage.setItem("app", appConfig.app);

        if (type_id == -1) {
            window.localStorage.setItem("projects", appConfig.merchantId); //todo:merchant.bkz
        }

        var objectData = JSON.parse(appConfig.data);

        var template = window.localStorage.getItem("Xtemplate");
        if ((template == null || template == undefined || template == "" || !objectData.config.template_configs
            .map(x => x.template_name)
            .includes(template)) && type_id == -1) {

            var thispctemplate = window.localStorage.getItem("thispctemplate");

            if (thispctemplate != null && thispctemplate != undefined && thispctemplate != "" &&
                !objectData.config.template_configs
                    .map(x => x.template_name)
                    .includes(thispctemplate)) {
                window.localStorage.setItem("thispctemplate", appConfig.template);
            }

            window.localStorage.setItem("Xtemplate", appConfig.template);
            // if (!path.pathname.includes(template)) {  // maybe it can be use it so, check domain control but config default value so it will be decide it which domain or config.
            window.location.replace("../../../apps/" + appConfig.app + "/" + appConfig.template + "/default.html" + window.location.hash);
            // }
        } else {

            if (!path.pathname.includes(template) && Xtemplate != null && Xtemplate != undefined && Xtemplate != ""
                && type_id == -1) {
                window.location.replace("../../../apps/" + appConfig.app + "/" + template + "/default.html" + window.location.hash);
            }

            public_data = objectData;
            require.config({
                baseUrl: './../../../system',
                urlArgs: 'v=1.0',

                waitSeconds: 100,
                paths: objectData.requireApp.paths,
                shim: objectData.requireApp.shim,
                deps: ["app"]
            });

            loadApplications(jsonObject)

            require(objectData.requireApp.requireItems,
                function () {
                    angular.bootstrap(document.body, ['app']);
                });

        }
    }
});


function loadApplications(projects) {

    projects = projects.filter(x => x.isOwnerLemoras && x._id > 0);

    if (window.location.hostname == mainAccountUrl[0]) {
        projects = projects.filter(x=> x.appId > 0);
    }

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

        var appName = groups[0].app.replace("-panel", "");
        var icon = "./../../../system/assets/appicon/icon.png";
        icon = icon.replace("/icon", "/" + appName);

        domains = domains.filter(x => x.includes(mainLandUrl[0]) && !x.includes("admin"));

        mainProjects.push({ appId: appId, appName: appName, domains: domains, icon: icon });
    });

    var strApps = JSON.stringify(mainProjects);
    window.localStorage.setItem("lemorasApplications", strApps);

}