(function () {
    'use strict';

    angular
        .module('app')
        .controller('StaticPageController', StaticPageController);

    StaticPageController.$inject = ['$rootScope'];
    function StaticPageController($rootScope) {
        var vm = this;
        $rootScope.staticPage.isNonHome = true;
    };
    
})();