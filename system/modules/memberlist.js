(function () {
    'use strict';

    angular
        .module('app')
        .controller('MemberListController', MemberListController);

    MemberListController.$inject = ['MemberService', '$rootScope', '$scope', '$filter'];
    function MemberListController(MemberService, $rootScope, $scope, $filter) {
        var vm = this;   

        vm.member = { };
        vm.members = [];

        vm.selectedMember = { };

        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.data = [];
        vm.q = '';

        vm.orderbyFieldQ = "";

        vm.orderbyField = function (name) {
             if (vm.orderbyFieldQ === "")
             vm.orderbyFieldQ = "-";
             else 
             vm.orderbyFieldQ = "";

             vm.orderQ =  vm.orderbyFieldQ + name;
        };

        vm.getAsName = function(roleId) {
            var parsedRoleId =  parseInt(String.fromCharCode(String(roleId).charCodeAt(0)));
            return GetTypeRoles().find((role) => role.value == parsedRoleId).text
        };
        
        vm.getData = function () {
          return $filter('filter')(vm.members, vm.q)
        }
        
        vm.numberOfPages=function(){
            return Math.ceil(vm.getData().length/vm.pageSize);
        }
        
        for (var i=0; i<65; i++) {
            vm.members.push("Item "+i);
        }
    
        $scope.$watch('q', function(newValue,oldValue){
            if(oldValue!=newValue){
            vm.currentPage = 0;
          }
        },true);


        vm.roles = [];
        
        initController();

        vm.removeMember = removeMember;
        vm.activeOrPassive = activeOrPassive;
        
        function initController() {
            loadMembers();
            loadRoles();
        } 

        function loadMembers() {
            MemberService.GetAll(function (response) {
                vm.members = response.members;
            });
        }

        function loadRoles() {
            vm.roles = GetTypeRoles();
        }

        function removeMember(member) {

            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            });

            swalWithBootstrapButtons.fire({
                title:  notifyCodeMsg.find(x=> x.code == "0x11107").detail[$rootScope.langKey],
                text: notifyCodeMsg.find(x=> x.code == "0x11108").detail[$rootScope.langKey],
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: notifyCodeMsg.find(x=> x.code == "0x11109").detail[$rootScope.langKey],
                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11110").detail[$rootScope.langKey],
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    MemberService.DeleteRole(member, function (response) {
                        if (response.status){
                            var index = vm.members.indexOf(member);
                            vm.members.splice(index, 1);   
                            
                            $rootScope.users.forEach(user=> {
                                if (user.id === member.id) {
                                    var userIndex = $rootScope.users.indexOf(user);
                                    $rootScope.users.splice(userIndex, 1);  
                                }
                            });
                        }
                    });
                }
            }); 
        }

        function activeOrPassive(member) {

            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            });

            var activePassiveLabel = member.active ? notifyCodeMsg.find(x=> x.code == "0x11111").detail[$rootScope.langKey] : notifyCodeMsg.find(x=> x.code == "0x11112").detail[$rootScope.langKey];

            swalWithBootstrapButtons.fire({
                title:  notifyCodeMsg.find(x=> x.code == "0x11113").detail[$rootScope.langKey],
                text: activePassiveLabel,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: notifyCodeMsg.find(x=> x.code == "0x11109").detail[$rootScope.langKey],
                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11110").detail[$rootScope.langKey],
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    MemberService.SetActiveOrPassive(member, function (response) {
                        if (response.status){
                            member.active = !member.active;
                        }
                    });
                }
            }); 
        }

        return vm;
    };

})();