(function () {
    'use strict';

    angular
        .module('app')
        .factory('LemorasService', LemorasService);

    LemorasService.$inject = ['getjson'];
    function LemorasService(getjson) {
        var service = {};

        service.InitSystem = InitSystem;
        service.CheckLemorasProject = CheckLemorasProject;

        return service;

        function InitSystem(data, callback) {
            getjson.postData(zoeURL + "system/init/nemutluturkumdiyene", { projects: data }, true).then(function(res) {
                callback(res);
            });
        }

        function CheckLemorasProject(data, callback) {
            getjson.postData(zoeURL + "system/init/update", { projects: data }, true).then(function(res) {
                callback(res);
            });
        }
    }

})();
