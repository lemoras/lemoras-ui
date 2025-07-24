(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$rootScope'];

    function DriveController($rootScope) {
        var vm = this;
        
        return vm;
    };

})();