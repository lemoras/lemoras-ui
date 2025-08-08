(function () {
    'use strict';

    angular
        .module('app')
        .factory('MemberService', MemberService);

    MemberService.$inject = ['getjson'];
    function MemberService(getjson) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllInfo = GetAllInfo;
        service.CreateRole = CreateRole;
        service.CreateMember = CreateMember;
        service.DeleteRole = DeleteRole;
        service.GetByMemberId = GetByMemberId;
        service.PutRole = PutRole;
        service.Zoe = Zoe;
        service.SetActiveOrPassive = SetActiveOrPassive;

        var memberServiceUrl = zoeURL + "system/";;
        var authServiceUrl = zoeURL + "security/";;

        return service;

        function Zoe(zoe, userId) {
            if (zoe.newPassword != zoe.reNewPassword) {
                notification.pushWarningNotify("Yeni şifreler uyuşmamaktadır");
                return;
            }
            var data = { password : zoe.newPassword, userId: userId };
            getjson.putData(passwordUrl, data).then(function (res) {
                if (res.status)
                    notification.pushSuccessNotify(res.message);
            });
        }

        function GetAll(callback) {
            getjson.getData(memberServiceUrl + "member", true).then(function (res) {
                    callback(res);  
            });            
        }

        function GetAllInfo(branchId, callback) {
            getjson.getData(getInfoUrl + "/" + branchId, true).then(function (res) {
                    callback(res);  
            });            
        }

        function CreateMember(member, callback) {
            AuthenticateService.CreateAccount(member.username, member.password, function(response){
                if (response.status) {
                    getjson.postData(authServiceUrl + "role", member, false, true).then(function (res) {
                        callback(res);
                    });   
                }
            });    
        }

        function CreateRole(member, callback) {
            getjson.postData(authServiceUrl + "role", member, false, false).then(function (res) {
                callback(res);
            });        
        }

        function GetByMemberId(memberId, callback) {
            getjson.getData(getByIdUrl + "/" + memberId, true).then(function (res) {
                    callback(res);  
            });            
        }

        function PutRole(member, callback) {
            var member = { }
            getjson.putData(authServiceUrl + "role", member, false, true).then(function (res) {
                    callback(res);  
            });            
        }

        function DeleteRole(member, callback) {
            getjson.deleteDataBody(authServiceUrl + "role", member, false, false).then(function (res) {
                    callback(res);  
            });            
        }

        function SetActiveOrPassive(member, callback) {
            getjson.putData(authServiceUrl + "role", member, false, false).then(function (res) {
                    callback(res);  
            });            
        }
    }

})();
