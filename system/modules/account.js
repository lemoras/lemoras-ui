(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['ProfileService', '$rootScope'];
    function AccountController(ProfileService, $rootScope) {
        var vm = this;  

        vm.account = null;
        vm.zoe = null;
        vm.myFile = null;
        
        vm.submitProfile = updateUser;
        vm.submitZOE = changePassword;
        vm.getAsName = getAsName;

        vm.uploadFile = uploadFile;
        vm.browseFile = browseFile;

        initController();

        function getAsName(roleId) {
            var parsedRoleId =  parseInt(String.fromCharCode(String(roleId).charCodeAt(0)));
            return GetTypeRoles().find((role) => role.value == parsedRoleId).text
        };

        function browseFile() {
            $("#file:hidden").trigger('click');
        };

       async function uploadFile(files) {

            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            });
            const uploaded = await new Promise((resolve, reject) => {
            swalWithBootstrapButtons.fire({
                title: notifyCodeMsg.find(x=> x.code == "0x11082").detail[$rootScope.langKey],
                text: notifyCodeMsg.find(x=> x.code == "0x11083").detail[$rootScope.langKey],
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: notifyCodeMsg.find(x=> x.code == "0x11084").detail[$rootScope.langKey],
                cancelButtonText: notifyCodeMsg.find(x=> x.code == "0x11085").detail[$rootScope.langKey],
                reverseButtons: true
            }).then(async (result) => {
                if (result.value) {
                    var file = files[0];
                    
                    var response =  await uploadFileTS(file, $rootScope.globals.currentUser.authToken, vm.account.photoUrl);
                   resolve(response);  
                }
            }) 
        });

        var photoURL = uploaded.url + "/" + uploaded.name;
        vm.account.photoUrl = photoURL;
        $rootScope.photoUrl = vm.account.photoUrl; 

        if (uploaded.name != undefined || uploaded.name != "") {
            ProfileService.Put(vm.account, function(res) {
                if (res.isSuccess) {
                    $(document).ready(function () {

                        const swalWithBootstrapButtons = Swal.mixin({
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false,
                    });

                    swalWithBootstrapButtons.fire(
                        notifyCodeMsg.find(x=> x.code == "0x11076").detail[$rootScope.langKey],
                        notifyCodeMsg.find(x=> x.code == "0x11086").detail[$rootScope.langKey],
                        'success'
                    );
                    window.location.replace("#!/profile");


                   });
                } else {
                    $(document).ready(function () {

                        const swalWithBootstrapButtons = Swal.mixin({
                                        confirmButtonClass: 'btn btn-success',
                                        cancelButtonClass: 'btn btn-danger',
                                        buttonsStyling: false,
                                    });
                
                                    swalWithBootstrapButtons.fire(
                                        notifyCodeMsg.find(x=> x.code == "0x11087").detail[$rootScope.langKey],
                                        notifyCodeMsg.find(x=> x.code == "0x11088").detail[$rootScope.langKey],
                                        'error'
                                    );
                   });
                }
            });
        }else {
            $(document).ready(function () {

                const swalWithBootstrapButtons = Swal.mixin({
                                confirmButtonClass: 'btn btn-success',
                                cancelButtonClass: 'btn btn-danger',
                                buttonsStyling: false,
                            });
        
                            swalWithBootstrapButtons.fire(
                                notifyCodeMsg.find(x=> x.code == "0x11087").detail[$rootScope.langKey],
                                notifyCodeMsg.find(x=> x.code == "0x11088").detail[$rootScope.langKey],
                                'error'
                            );
           });
        }  

        };

        const BASE_URL = "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-822bb08b-a21a-434e-93ce-656ca1c9e676";
        const UPLOAD_PATH = 'system/file';
        /**
         * Uploads a file by getting a signed Spaces POST payload and using it to 
         * upload the file.
         * @param {File} file 
         * @returns 
         */
        async function uploadFileTS(file, token, oldFile) {

            const signedPostRes = await fetch(`${BASE_URL}/${UPLOAD_PATH}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify({
                old_file_name: oldFile,
                file_name: file.name,
                content_type: file.type
              })
            })
          
            const signedPayload = (await signedPostRes.json()).payload;
            const form = new FormData();
            form.append('ACL', 'public-read');
          
            Object.entries(signedPayload.fields).forEach(([field, value]) => {
              form.append(field, value);
            })
          
            form.append('file', file, signedPayload.fields.key);
            await fetch(signedPayload.url, {
              method: 'POST',
              body: form,
            });
          
            return {
              url: signedPayload.url,
              name: signedPayload.fields.key
            };
          }

        function initController() {
            loadCurrentUser();
        } 

        function loadCurrentUser() {
            ProfileService.Get(function (response) {
                vm.account = response.account;
                $rootScope.photoUrl = vm.account.photoUrl; 
            });
        }

        function changePassword() {
            ProfileService.Zoe(vm.zoe, function(res) {
                if (res.isSuccess) {
                    $(document).ready(function () {

                        const swalWithBootstrapButtons = Swal.mixin({
                            confirmButtonClass: 'btn btn-success',
                            cancelButtonClass: 'btn btn-danger',
                            buttonsStyling: false,
                        });

                        swalWithBootstrapButtons.fire(
                            notifyCodeMsg.find(x=> x.code == "0x11076").detail[$rootScope.langKey],
                            notifyCodeMsg.find(x=> x.code == "0x11080").detail[$rootScope.langKey],
                            'success'
                        );
                   });
                } else {
                    $(document).ready(function () {

                        const swalWithBootstrapButtons = Swal.mixin({
                            confirmButtonClass: 'btn btn-success',
                            cancelButtonClass: 'btn btn-danger',
                            buttonsStyling: false,
                        });

                        swalWithBootstrapButtons.fire(
                            notifyCodeMsg.find(x=> x.code == "0x11081").detail[$rootScope.langKey],
                            notifyCodeMsg.find(x=> x.code == "0x11089").detail[$rootScope.langKey],
                            'warning'
                        );
                   });
                }
            });
        }

        function updateUser() {
            if (vm.account.email.$invalid || vm.account.email === "") {
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11090").detail[$rootScope.langKey]);
                return;
            }
            if (vm.account.nickname.$invalid || vm.account.nickname === "") {
                demo.showNotificationSelf(notifyCodeMsg.find(x=> x.code == "0x11091").detail[$rootScope.langKey]);
                return;
            }

            ProfileService.Put(vm.account, function(res) {
                if (res.isSuccess) {
                    $(document).ready(function () {

                        const swalWithBootstrapButtons = Swal.mixin({
                            confirmButtonClass: 'btn btn-success',
                            cancelButtonClass: 'btn btn-danger',
                            buttonsStyling: false,
                        });

                        swalWithBootstrapButtons.fire(
                            notifyCodeMsg.find(x=> x.code == "0x11076").detail[$rootScope.langKey],
                            notifyCodeMsg.find(x=> x.code == "0x11092").detail[$rootScope.langKey],
                            'success'
                        );
                   });
                } else {
                    $(document).ready(function () {

                        const swalWithBootstrapButtons = Swal.mixin({
                            confirmButtonClass: 'btn btn-success',
                            cancelButtonClass: 'btn btn-danger',
                            buttonsStyling: false,
                        });

                        swalWithBootstrapButtons.fire(
                            notifyCodeMsg.find(x=> x.code == "0x11081").detail[$rootScope.langKey],
                            notifyCodeMsg.find(x=> x.code == "0x11093").detail[$rootScope.langKey],
                            'warning'
                        );
                   });
                }
            });
        }
    }

})();