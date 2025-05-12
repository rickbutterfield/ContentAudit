angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.AllPages.InfoController", [
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
            vm.renderStatusCodeLabel = contentAuditResource.renderStatusCodeLabel;
            vm.renderCarbonRatingLabel = contentAuditResource.renderCarbonRatingLabel;

            var isInfiniteMode = editorService.getNumberOfEditors() > 0 ? true : false;
            var infiniteModel = editorService.getEditors()[0];
            let detailsId = isInfiniteMode ? infiniteModel.id : $routeParams.id;

            init();

            function init() {
                if (!contentAuditResource.isGuid(detailsId)) {
                    contentAuditResource.getKey(detailsId).then(function (key) {
                        contentAuditResource.getLatestPageAuditData(key).then(function (data) {
                            vm.data = data;
                        });
                    });
                }

                else {
                    contentAuditResource.getLatestPageAuditData(detailsId).then(function (data) {
                        vm.data = data;
                    });
                }
            }
        }
    ]);