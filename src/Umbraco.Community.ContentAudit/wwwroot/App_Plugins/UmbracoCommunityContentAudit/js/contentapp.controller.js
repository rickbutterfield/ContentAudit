(function () {
    'use strict';

    function ContentAppController($location, $routeParams) {

        var vm = this;

        vm.setActiveTab = setActiveTab;

        init();

        function init() {
            vm.tabs = [
                {
                    label: 'Details',
                    alias: 'details',
                    active: true,
                    view: "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/info.html"
                },
                {
                    label: 'Links',
                    alias: 'links',
                    active: false,
                    view: "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/links.html"
                },
                {
                    label: 'Images',
                    alias: 'images',
                    active: false,
                    view: "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/images.html"
                },
                {
                    label: 'Resources',
                    alias: 'resources',
                    active: false,
                    view: "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/resources.html"
                },
                {
                    label: 'Issues',
                    alias: 'issues',
                    active: false,
                    view: "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/issues.html"
                },

            ]
        }

        function setActiveTab(tab) {
            vm.activeTabAlias = tab.alias;
            vm.tabs.forEach(tab => tab.active = false);
            tab.active = true;
        }
    }

    angular.module('umbraco').controller('Umbraco.Community.ContentAudit.ContentAppController', ContentAppController);

})();
