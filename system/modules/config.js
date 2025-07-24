(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['$rootScope', 'getjson'];
    function ConfigController($rootScope, getjson) {
        var vm = this;

        vm.system = "";

        vm.configCheck = {};

        vm.showData = showData;

        function showData(){
            
            alert(JSON.stringify(vm.configCheck));
        }

        function readSystem() {

            getjson.getData(baseURL + '/system.md')
                .then(function (res) {

                    const markdownParser = (text) => {
                        const toHTML = text
                            .replace(/^#### (.*$)/gim, '<li class="list-group-item"><input id="$1" type="checkbox"> <label style="color:#485262; font-size:13px;" for="$1"> $1 </label></li>') // h4 tag
                            .replace(/^### (.*$)/gim, '</ul></li><li class="list-group-item"><input id="$1" type="checkbox"> <label style="color:#485262; font-size:13px;" for="$1"> $1 </label> <ul class="list-group">') // h3 tag
                            .replace(/^## (.*$)/gim, '</ul></ul></li><li class="list-group-item"><input id="$1" type="checkbox"> <label style="color:#485262; font-size:13px;" for="$1"> $1 </label> <ul class="list-group"><ul class="list-group">') // h2 tag
                            .replace(/^# (.*$)/gim, '</ul></ul></ul></li><li class="list-group-item"><input id="$1" type="checkbox"> <label style="color:#485262; font-size:13px;" for="$1"> $1 </label> <ul class="list-group"><ul class="list-group"><ul class="list-group">') // h1 tag
                            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b><br>') // bold text
                            .replace(/\*(.*)\*/gim, '<i>$1</i><br>'); // italic text
                        return toHTML.trim(); // using trim method to remove whitespace
                    }
                    vm.system = markdownParser(res);
                    document.getElementById("systemNodes").innerHTML = vm.system;
                });

        }

        //readSystem();
    }

})();