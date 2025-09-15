(function () {
    'use strict';

    angular
        .module('app')
        .factory('TemplateService', TemplateService);

    TemplateService.$inject = [];
    function TemplateService() {
        var service = {};

        service.SetTemplate = SetTemplate;
        service.Clear = Clear;

        return service;

        function Clear() {
            window.localStorage.removeItem("thispctemplate");
        }
        
        function SetTemplate(pTemplate) {
            window.localStorage.setItem("template", pTemplate); 
            window.localStorage.setItem("Xtemplate", pTemplate); 
            if (pTemplate === "default") {                
                Clear(); 
            } else {
                window.localStorage.setItem("thispctemplate", pTemplate);      
            }
        }
    }

})();
