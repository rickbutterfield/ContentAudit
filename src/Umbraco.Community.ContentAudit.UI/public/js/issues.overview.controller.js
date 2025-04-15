angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.Issues.OverviewController", [
        "$scope",
        "$timeout",
        "$location",
        "$sce",
        "$routeParams",
        "navigationService",
        "Umbraco.Community.ContentAudit.Resource",
        function ($scope, $timeout, $location, $sce, $routeParams, navigationService, contentAuditResource) {

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1] });

            let vm = this;

            vm.name = "Issues";
            vm.loading = true;
            vm.pageNumber = 1;
            vm.pageSize = 20;
            vm.issueData = [];

            vm.changePageNumber = changePageNumber;
            vm.renderTypeLabel = contentAuditResource.renderTypeLabel;
            vm.renderPriorityLabel = contentAuditResource.renderPriorityLabel;

            init();

            function init() {
                let skip = vm.pageNumber != 1 ? ((vm.pageNumber - 1) * vm.pageSize) : 0;
                let take = vm.pageSize;

                contentAuditResource
                    .getAllIssues(
                        skip,
                        take,
                        ''
                    )
                   .then(function (data) { vm.totalPages = Math.ceil(data.total / vm.pageSize);
                        vm.issueData = data.items;
                        vm.loading = false;
                    })
            }

            function changePageNumber(pageNumber) {
                vm.pageNumber = pageNumber;
                init();
            }

            vm.issueDetails = function (unique) {
                $location.search('create', null);
                $location.path("/audit/issues/details/" + unique);
            }
        }
    ]);