angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.Controller.Issues", [
        "$scope",
        "$routeParams",
        "navigationService",
        "Umbraco.Community.ContentAudit.Resource",
        function ($scope, $routeParams, navigationService, contentAuditResource) {

            navigationService.syncTree({
                tree: $routeParams.tree,
                path: [-1, $routeParams.method],
                forceReload: false,
            });

            let vm = this;

            vm.name = "Issues";
            vm.loading = true;
            vm.pageNumber = 1;
            vm.pageSize = 20;
            vm.issueData = [];
            vm.sortingDesc = false;
            vm.sortingColumn = "CarbonRating";

            vm.changePageNumber = changePageNumber;
            vm.sortingHandler = sortingHandler;

            init();

            function init() {
                let skip = vm.pageNumber != 1 ? (vm.pageNumber - 1 * vm.pageSize) : 0;
                let take = vm.pageSize;

                contentAuditResource
                    .getAllIssues(
                        skip,
                        take,
                        ''
                    )
                    .then(function (data) {
                        debugger;
                        vm.issueData = data.items;
                    })
            }

            function changePageNumber(pageNumber) {
                vm.pageNumber = pageNumber;
                init();
            }

            function sortingHandler(columnName) {
                vm.sortingDesc =
                    vm.sortingColumn === columnName ? !vm.sortingDesc : false;
                vm.sortingColumn = columnName;
                init();
            }
        }
    ]);