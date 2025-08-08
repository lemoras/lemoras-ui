(function () {
    'use strict';

    angular
        .module('app')
        .controller('LemorasController', LemorasController);

    LemorasController.$inject = ['LemorasService', '$rootScope'];
    function LemorasController(LemorasService, $rootScope) {
        var vm = this;

    }

})();