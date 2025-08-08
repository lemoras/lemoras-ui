(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationsController', ApplicationsController);

    ApplicationsController.$inject = ['$rootScope'];
    function ApplicationsController($rootScope) {
        var vm = this;

        vm.login = login;

        initController();


        function initController() {
            loadApplications();
            // loadProjects();
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
            var externalURL = "http://" + mainAccountUrl[0] + "/#!/applications?type=loginbydomain&domain=" + domain;
            window.location.replace(externalURL);
            return;
        }
    }

})();