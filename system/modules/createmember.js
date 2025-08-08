(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateMemberController', CreateMemberController);

    CreateMemberController.$inject = ['MemberService', '$rootScope', 'AuthenticationService'];
    function CreateMemberController(MemberService, $rootScope, AuthenticationService) {
        var vm = this;   
        
        vm.submitMember = createUser;
        vm.setAutoNickname = setAutoNickname;

        vm.leave = leave;

        initController();

        function clear() {
            vm.member = { role: 99 };
           
            vm.tmpMember = { rePassword: "" };

            vm.selectedRole = null;

            vm.roles = [];
        }

        function leave() {
            window.location.href = '#!/dashboard';
        }


        function initController() {
            clear();
            loadRoles();
        } 

        function setAutoNickname() {
            vm.member.nickname = vm.member.email.split('@')[0];
        }

        function loadRoles() {
           vm.roles = GetTypeRoles($rootScope.globals.currentUser.roleId);
        }

        function createUser() {

            if ($rootScope.users.map(x=> x.nickname).includes(vm.member.nickname)) {
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11095").detail[$rootScope.langKey]);
                return;
            }
           
            if (vm.member.email.$invalid || vm.member.email === "") {
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11090").detail[$rootScope.langKey]);
                return;
            }
            if (vm.member.nickname.$invalid || vm.member.nickname === "") {
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11096").detail[$rootScope.langKey]);
                return;
            }
            if (vm.member.aboutMe.$invalid || vm.member.aboutMe === "") {
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11097").detail[$rootScope.langKey]);
                return;
            }
            
            if (vm.member.password !== vm.tmpMember.rePassword){
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11098").detail[$rootScope.langKey]);
                    return;
            }

            if (vm.selectedRole == null){
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11099").detail[$rootScope.langKey]);
                    return;
            }

            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            });

            swalWithBootstrapButtons.fire({
                title: notifyCodeMsg.find(x=> x.code == "0x11082").detail[$rootScope.langKey],
                text: notifyCodeMsg.find(x=> x.code == "0x11100").detail[$rootScope.langKey],
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: notifyCodeMsg.find(x=> x.code == "0x11101").detail[$rootScope.langKey],
                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11085").detail[$rootScope.langKey],
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    vm.member.role = parseInt(vm.selectedRole);

                    AuthenticationService.CreateFullAccount(vm.member, function(res){
                        if (res.status)
                        {
                            vm.member.roleId = parseInt(vm.selectedRole);
                            vm.member.appId = $rootScope.globals.currentUser.appId
                            vm.member.merchantId = $rootScope.globals.currentUser.merchantId

                            MemberService.CreateRole(vm.member, function (response){
                                if (response.status) {
                                    vm.member.userId = response.role.userId;
                                    //$rootScope.users.push(response.role); onemli
                                    
                                    $(document).ready(function () {
        
                                        const swalWithBootstrapButtons = Swal.mixin({
                                            confirmButtonClass: 'btn btn-success',
                                            cancelButtonClass: 'btn btn-danger',
                                            buttonsStyling: false,
                                        });
                
                                        swalWithBootstrapButtons.fire({
                                            title: notifyCodeMsg.find(x=> x.code == "0x11076").detail[$rootScope.langKey],
                                            text: notifyCodeMsg.find(x=> x.code == "0x11102").detail[$rootScope.langKey],
                                            type: 'success',
                                            showCancelButton: true,
                                            confirmButtonText: notifyCodeMsg.find(x=> x.code == "0x11103").detail[$rootScope.langKey],
                                            cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11078").detail[$rootScope.langKey],
                                            reverseButtons: true
                                        }).then((result) => {
                                            if (result.value) {
                                                initController();
                                            } else {
                                                window.location.href = '#!/dashboard';
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    });

                }
            }); 
        }

        return vm;
    };

})();