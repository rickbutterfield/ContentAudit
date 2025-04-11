angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.Controller.Metadata", [
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

            let vm = this;

            vm.name = "Metadata";
            vm.loading = true;
            vm.pageNumber = 1;
            vm.pageSize = 20;
            vm.data = [];
            vm.filter = '';

            vm.changePageNumber = changePageNumber;

            init();

            function init() {
                let skip = vm.pageNumber != 1 ? ((vm.pageNumber - 1) * vm.pageSize) : 0;
                let take = vm.pageSize;

                contentAuditResource
                    .getMetadata(
                        skip,
                        take,
                        vm.filter
                    )
                   .then(function (data) { vm.totalPages = Math.ceil(data.total / vm.pageSize);
                        vm.totalPages = Math.ceil(data.total / vm.pageSize);
                        vm.data = data.items;
                        vm.loading = false;
                    })
            }

            function changePageNumber(pageNumber) {
                vm.pageNumber = pageNumber;
                init();
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