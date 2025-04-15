angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.AllPages.OverviewController", [
        "$scope",
        "$timeout",
        "$location",
        "$sce",
        "$routeParams",
        "navigationService",
        "Umbraco.Community.ContentAudit.Resource",
        'overlayService',
        'editorService',
        function ($scope, $timeout, $location, $sce, $routeParams, navigationService, contentAuditResource, overlayService, editorService) {

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1] });

            var unsubscribe = [];
            unsubscribe.push($scope.$watch('vm.filter', init));

            let vm = this;

            vm.name = "All Pages";
            vm.loading = true;
            vm.pageNumber = 1;
            vm.pageSize = 20;
            vm.data = [];
            vm.filter = '';

            vm.renderStatusCodeLabel = contentAuditResource.renderStatusCodeLabel;
            vm.changePageNumber = changePageNumber;

            init();

            function init() {
                let skip = vm.pageNumber != 1 ? ((vm.pageNumber - 1) * vm.pageSize) : 0;
                let take = vm.pageSize;

                contentAuditResource
                    .getLatestAuditData(
                        skip,
                        take,
                        vm.filter,
                        0
                    )
                    .then(function (data) {
                        vm.totalPages = Math.ceil(data.total / vm.pageSize);
                        vm.data = data.items;

                        vm.loading = false;
                    })
            }

            function changePageNumber(pageNumber) {
                vm.pageNumber = pageNumber;
                init();
            }

            vm.pageDetails = function (unique) {
                $location.search('create', null);
                $location.path("/audit/all-pages/details/" + unique);
            }
        }
    ]);