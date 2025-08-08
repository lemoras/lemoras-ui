(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChangeTemplateController', ChangeTemplate);

    ChangeTemplate.$inject = ['TemplateService', 'AuthenticationService', 'FlashService', 'notification', '$rootScope'];
    function ChangeTemplate(TemplateService, AuthenticationService, FlashService, notification, $rootScope) {
        var vm = this;

        var configDataObject = window.localStorage.getItem("config");
        var config = JSON.parse(configDataObject).config;

        var template_names = config.template_configs.map(x=> x.template_name);

        var setTemplate = function (template, callback){
            
            if ($rootScope.globals == undefined || $rootScope.globals == {} || $rootScope.globals == null) {

                $rootScope.globals = $cookies.getObject('globals') || {};
            }

            if (!($rootScope.globals == undefined || $rootScope.globals == {} || $rootScope.globals == null)) {

                var account = {
                    username : $rootScope.globals.currentUser.username,
                    appId : $rootScope.globals.currentUser.appId,
                    roleId : $rootScope.globals.currentUser.roleId,
                    merchantId : $rootScope.globals.currentUser.merchantId,
                }
                
                TemplateService.SetTemplate(template);
                AuthenticationService.GetConfig(account, function(result) {
                    FlashService.WriteLocal(false, result);
                    callback(true);
                });
            }
        }

        var whenNotSetTemplateAlert = function() {
            notification.pushWarningNotify(notifyCodeMsg.find(x=> x.code == "0x11094").detail[$rootScope.langKey]);
        }

        askQuestion(whenNotSetTemplateAlert, setTemplate, template_names);
    };
    
})();