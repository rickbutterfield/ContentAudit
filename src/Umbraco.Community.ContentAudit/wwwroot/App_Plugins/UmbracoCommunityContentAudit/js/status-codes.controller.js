angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.Controller.StatusCodes", [
        "$scope",
        "$timeout",
        "$sce",
        "$routeParams",
        "navigationService",
        "Umbraco.Community.ContentAudit.Resource",
        'overlayService',
        'editorService',
        function ($scope, $timeout, $sce, $routeParams, navigationService, contentAuditResource, overlayService, editorService) {

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1] });

            var unsubscribe = [];
            unsubscribe.push($scope.$watch('vm.filter', init));
            unsubscribe.push($scope.$watch('vm.statusCode', init));

            let vm = this;

            vm.name = "Status Codes";
            vm.loading = true;
            vm.pageNumber = 1;
            vm.pageSize = 20;
            vm.data = [];
            vm.filter = '';

            vm.statusCodes = [];
            vm.statusCode = "0";

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
                        vm.statusCode
                    )
                   .then(function (data) { vm.totalPages = Math.ceil(data.total / vm.pageSize);
                        vm.data = data.items;

                        vm.statusCodes = [...new Set(data.items.map(item => item.statusCode))];

                        vm.loading = false;
                    })
            }

            function changePageNumber(pageNumber) {
                vm.pageNumber = pageNumber;
                init();
            }

            vm.renderStatusCodeLabel = function (statusCode) {
                let colour = "";
                if (statusCode >= 200 && statusCode < 300) {
                    color = "positive";
                }

                if (statusCode >= 300 && statusCode < 400) {
                    color = "warning";
                }

                if (statusCode >= 400 && statusCode < 600) {
                    color = "danger";
                }
                return $sce.trustAsHtml(`
                    <uui-tag color="${color}">
                        ${statusCode}
                    </uui-tag>
                `);
            }

            vm.inlineEditor = function ($event, nodeKey) {
                $event.preventDefault();
                var editorModel = {
                    id: nodeKey,
                    submit: function (model) {
                        editorService.close();
                    },
                    close: function () {
                        editorService.close();
                    }
                };

                overlayService.close();
                editorService.contentEditor(editorModel);
                return;
            }
        }
    ]);