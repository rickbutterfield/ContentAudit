(function () {
    'use strict';

    function SectionController($location, $routeParams) {

        var vm = this;
        vm.page = {};
        vm.page.labels = {};
        vm.page.name = '';
        vm.page.navigation = [];

        onInit();

        function onInit() {
            loadNavigation();
            setPageName();
        }

        function loadNavigation() {
            let route = $routeParams.method;
            vm.page.navigation = [
                {
                    'name': 'Overview',
                    'icon': 'icon-scan',
                    'view': '/App_Plugins/UmbracoCommunityContentAudit/views/overview.html',
                    'active': !route || route === 'overview',
                    'alias': 'overview',
                },
                {
                    'name': 'Settings',
                    'icon': 'icon-settings',
                    'view': '/App_Plugins/UmbracoCommunityContentAudit/views/settings.html',
                    'active': route === 'settings',
                    'alias': 'settings'
                },
            ];
        }

        function setPageName() {
            vm.page.name = 'ContentAudit';
        }
    }

    angular.module('umbraco').controller('Umbraco.Community.ContentAudit.SectionController', SectionController);

})();
