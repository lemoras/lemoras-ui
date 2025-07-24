(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location', 'FlashService', '$rootScope'];
    function RegisterController(AuthenticationService, $location, FlashService, $rootScope) {
        var vm = this;
        
        vm.register = register;
        vm.setAutoNickname = setAutoNickname;
        vm.goLogin = goLogin;
        
        vm.returnParam = null;
        vm.typeParam = null;
        vm.merchantId = "";

        vm.returnUrl = "";
        vm.appIds = [];

        (function initController() {

            vm.returnUrl = "";
            vm.appIds = "";
            var urlParams = $location.search();
            vm.returnParam = urlParams.return;
            vm.typeParam = urlParams.type;
            
        })();

        function setAutoNickname() {
            vm.nickname = vm.email.split('@')[0];
        }

        function register() {
            vm.dataLoading = true;

            AuthenticationService.CreateFullAccount({ email: vm.email, password:vm.password, nickname:vm.nickname }, function (response) {
                    if (response.status) {
                        FlashService.Success('Kayıt başarılı', true);
                        $(document).ready(function () {

                            const swalWithBootstrapButtons = Swal.mixin({
                                confirmButtonClass: 'btn btn-success',
                                cancelButtonClass: 'btn btn-danger',
                                buttonsStyling: false,
                            });
    
                            swalWithBootstrapButtons.fire({
                                title: notifyCodeMsg.find(x=> x.code == "0x11076").detail[$rootScope.langKey],
                                text: notifyCodeMsg.find(x=> x.code == "0x11079").detail[$rootScope.langKey],
                                type: 'success',
                                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11078").detail[$rootScope.langKey],
                                reverseButtons: true
                            }).then((result) => {
                                if (vm.returnParam == null) {	
                                    window.location.href = '#!/login';
                                } else if (vm.returnParam == "callback" ) {
                                    window.location.href = "#!/login?return=callback&type=" + vm.typeParam;
                                }
                            });
                       });
                       if (vm.returnParam == null) {	
                        window.location.href = '#!/login';
                    } else if (vm.returnParam == "callback" ) {
                        window.location.href = "#!/login?return=callback&type=" + vm.typeParam;
                    }
                       // $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        $(document).ready(function () {

                            const swalWithBootstrapButtons = Swal.mixin({
                                confirmButtonClass: 'btn btn-success',
                                cancelButtonClass: 'btn btn-danger',
                                buttonsStyling: false,
                            });

                            swalWithBootstrapButtons.fire({
                                title: notifyCodeMsg.find(x=> x.code == "0x11076").detail[$rootScope.langKey],
                                text: notifyCodeMsg.find(x=> x.code == "0x11077").detail[$rootScope.langKey],
                                type: 'warning',
                                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11078").detail[$rootScope.langKey],
                                reverseButtons: true
                            }).then((result) => {
                                if (vm.returnParam == null) {	
                                    window.location.href = '#!/login';
                                } else if (vm.returnParam == "callback" ) {
                                    window.location.href = "#!/login?return=callback&type=" + vm.typeParam;
                                }
                            });
                       });
                    if (vm.returnParam == null) {	
                        window.location.href = '#!/login';
                   } else if (vm.returnParam == "callback" ) {
                        window.location.href = "#!/login?return=callback&type=" + vm.typeParam;
                   }
                    }
                    vm.dataLoading = false;
                });
        }

        function goLogin() {
            if (vm.returnParam == null) {	
                window.location.href = '#!/login';
            } else if (vm.returnParam == "callback" ) { // localhosttan gelirse tekrar localhosta nasil doner bir parametre ile diger turlu accounta da parametreli gelebilir
                window.location.href = "#!/login?return=callback&type=" + vm.typeParam;
            }
        }
    }

})();
