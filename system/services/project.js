(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['getjson'];
    function ProjectService(getjson) {
        var service = {};

        service.GetMerchantByDomain = GetMerchantByDomain;
        service.GetAll = GetAll;
        service.CreateProject = CreateProject;
        service.UpdateProject = UpdateProject;
        service.DeleteProject = DeleteProject;

        return service;

        function GetMerchantByDomain(callback) {
            getjson.getData(zoeURL + "system/project", true).then(function(res) {
                callback(res)
            });
        }

        function GetAll(callback) {
            getjson.getData(zoeURL + "system/project", true).then(function(res) {
                callback(res)
            });
        }

        function CreateProject(project, callback) {
            getjson.postData(zoeURL + "system/project", project, true).then(function(res) {
                callback(res)
            });
        }

        function UpdateProject(project, callback) {
            getjson.putData(zoeURL + "system/project", project, true).then(function(res) {
                callback(res)
            });
        }

        function DeleteProject(project, callback) {
            getjson.deleteDataBody(zoeURL + "system/project", project, true).then(function(res) {
                callback(res)
            });
        }
    }

})();
