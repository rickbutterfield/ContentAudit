angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.AllPages.IssuesController", [
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
            vm.renderTypeLabel = contentAuditResource.renderTypeLabel;
            vm.renderPriorityLabel = contentAuditResource.renderPriorityLabel;

            let detailsId = $routeParams.id;

            init();

            function init() {
                contentAuditResource.getLatestPageAuditData(detailsId).then(function (data) {
                    vm.data = data.issues;
                });
            }

            vm.issueDetails = function (unique) {
                $location.search('create', null);
                $location.path("/audit/issues/details/" + unique);
            }

        }
    ]);