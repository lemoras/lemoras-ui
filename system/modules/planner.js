(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlannerController', PlannerController);

    PlannerController.$inject = ['$rootScope'];

    function PlannerController($rootScope) {
        var vm = this;
        
        return vm;
    };

})();