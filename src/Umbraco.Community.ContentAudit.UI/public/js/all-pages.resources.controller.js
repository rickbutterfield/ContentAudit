angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.AllPages.ResourcesController", [
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

            let detailsId = $routeParams.id;

            init();

            function init() {
                if (!contentAuditResource.isGuid(detailsId)) {
                    contentAuditResource.getKey(detailsId).then(function (key) {
                        contentAuditResource.getLatestPageAuditData(key).then(function (data) {
                            vm.data = data.resources;
                        });
                    });
                }

                else {
                    contentAuditResource.getLatestPageAuditData(detailsId).then(function (data) {
                        vm.data = data.resources;
                    });
                }
            }

        }
    ]);