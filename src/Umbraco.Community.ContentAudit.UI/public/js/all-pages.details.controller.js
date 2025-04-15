angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.AllPages.DetailsController", [
        "$scope",
        "$timeout",
        "$location",
        "$sce",
        "$routeParams",
        "navigationService",
        "editorService",
        "overlayService",
        "Umbraco.Community.ContentAudit.Resource",
        function ($scope, $timeout, $location, $sce, $routeParams, navigationService, editorService, overlayService, contentAuditResource) {

            var vm = this;
            vm.page = {};
            vm.page.name = "";
            vm.page.navigation = [];

            let detailsId = $routeParams.id;
            let detailsUri = $routeParams.method;

            init();

            function init() {
                loadNavigation();
                loadData();
            }

            function loadData() {
                contentAuditResource.getLatestPageAuditData(detailsId).then(function (data) {
                    vm.page.name = data.pageData.url;
                });
            }

            function loadNavigation() {
                vm.page.navigation = [
                    {
                        "name": "Details",
                        "icon": "icon-info",
                        "view": "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/info.html",
                        "active": !detailsUri || detailsUri === "details",
                        "alias": "details",
                        //"action": function () {
                        //    $location.path(`/audit/all-pages/details/${detailsId}/details`);
                        //}
                    },
                    {
                        "name": "Links",
                        "icon": "icon-link",
                        "view": "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/links.html",
                        "active": detailsUri === "links",
                        "alias": "links",
                        //"action": function () {
                        //    $location.path(`/audit/all-pages/details/${detailsId}/links`);
                        //}
                    },
                    {
                        "name": "Images",
                        "icon": "icon-picture",
                        "view": "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/images.html",
                        "active": detailsUri === "images",
                        "alias": "images",
                        //"action": function () {
                        //    $location.path(`/audit/all-pages/details/${detailsId}/images`);
                        //}
                    },
                    {
                        "name": "Resources",
                        "icon": "icon-script",
                        "view": "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/resources.html",
                        "active": detailsUri === "resources",
                        "alias": "resources",
                        //"action": function () {
                        //    $location.path(`/audit/all-pages/details/${detailsId}/resources`);
                        //}
                    },
                    {
                        "name": "Issues",
                        "icon": "icon-alert",
                        "view": "/App_Plugins/UmbracoCommunityContentAudit/backoffice/all-pages/issues.html",
                        "active": detailsUri === "issues",
                        "alias": "issues",
                        //"action": function () {
                        //    $location.path(`/audit/all-pages/details/${detailsId}/issues`);
                        //}
                    }
                ];

                vm.back = function () {
                    $location.path(`audit/all-pages/overview`);
                }
            }
        }
    ]);