(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeaveMessageController', LeaveMessageController);

    LeaveMessageController.$inject = ['MessageService', '$rootScope'];
    function LeaveMessageController(MessageService, $rootScope) {
        var vm = this;

    }

})();