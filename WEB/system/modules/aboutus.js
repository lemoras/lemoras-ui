(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutUsController', AboutUsController);

    AboutUsController.$inject = ['LemorasService', '$rootScope'];
    function AboutUsController(LemorasService, $rootScope) {
        var vm = this;

    }

})();