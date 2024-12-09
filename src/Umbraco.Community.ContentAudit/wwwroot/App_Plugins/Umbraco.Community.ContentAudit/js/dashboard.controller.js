(function () {
    "use strict";

    function DashboardController($location, $routeParams, localizationService, localStorageService) {

        var vm = this;
        vm.page = {};
        vm.page.labels = {};
        vm.page.name = "";
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
                    "name": "Overview",
                    "icon": "icon-scan",
                    "view": "views/packages/views/marketplace.html",
                    "active": !route || route === "overview",
                    "alias": "overview",
                    "action": function () {
                        $location.path("/contentAudit/overview");
                    }
                },
                {
                    "name": "Settings",
                    "icon": "icon-settings",
                    "view": "views/packages/views/installed.html",
                    "active": route === "settings",
                    "alias": "settings",
                    "action": function () {
                        $location.path("/contentAudit/settings");
                    }
                },
            ];
        }

        function setPageName() {
            //localizationService.localize("sections_packages").then(function (data) {
            vm.page.name = "Audit";
            //})
        }
    }

    angular.module("umbraco").controller("Umbraco.Community.ContentAudit.DashboardController", DashboardController);

})();
