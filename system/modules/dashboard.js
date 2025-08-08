(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope'];
    function DashboardController($rootScope) {
        var vm = this;

        initController();


        function initController() {
            loadApplications();
            // loadProjects();

            var domain = window.localStorage.getItem("loginbydomain");
            if (domain != undefined && domain != "" && domain != "undefined" && domain != null) {
                window.localStorage.removeItem("loginbydomain");
                login(domain);
            }

            var domain = window.localStorage.getItem("triggerApplicationsHash");
            if (domain != undefined && domain != "" && domain != "undefined" && domain != null) {
                window.localStorage.removeItem("triggerApplicationsHash");
                window.location.replace(domain);
            }
        }

        // function loadProjects() {
        //     ProjectService.GetAll(function (response) {
        //         vm.projects = response.projects;
        //     });
        // }

        function loadApplications() {
            vm.applications = $rootScope.lemorasApps;
        }

        function login(domain) {

            var strSessions = window.localStorage.getItem("sessions") || "";

            var notFound = true;
            if (strSessions != "") {
                var sessions = JSON.parse(strSessions);

                sessions = sessions.filter(x => !mainAccountUrl.includes(x));

                var externalURL = "http://" + domain;
                sessions.forEach((e, index) => {
                    if (domain == e) {
                        notFound = true;
                        window.location.replace(externalURL);
                    }
                });
            }

            if (notFound) {
                var email = $rootScope.globals.currentUser.email;
                if (CheckTokenTimeout()) {
                    triggerExternalLogin(domain, email);
                } else {
                    triggerExternalLogin(domain, email, $rootScope.globals.currentUser.pureToken);
                }
            }
        }

        function triggerExternalLogin(domain, email, token = undefined) {

            var loginbyTokenUrlParam = "";

            if (token != undefined) {
                loginbyTokenUrlParam = "&token=" + token;
            }

            var externalURL = "http://" + domain + "/#!/login?return=triggerCallback&email=" + email + loginbyTokenUrlParam;

            window.location.replace(externalURL);
        }

        function CheckTokenTimeout() {
           
            if ($rootScope.globals.currentUser.createdTime == undefined) {
                return true;
            }

            var nowDate = new Date($rootScope.globals.currentUser.createdTime);
            nowDate.setSeconds(nowDate.getSeconds() + 58);

            var countDownDate = nowDate.getTime();
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            return distance < 0;
        }

    }

})();