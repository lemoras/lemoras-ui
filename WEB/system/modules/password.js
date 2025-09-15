(function () {
    'use strict';

    angular
        .module('app')
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['$rootScope'];

    function PasswordController($rootScope) {
        var vm = this;
        
        return vm;
    };

})();