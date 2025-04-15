angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.Controller.OutboundLinks", [
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

            vm.name = "Outbound Links";
            vm.loading = true;
            vm.pageNumber = 1;
            vm.pageSize = 20;
            vm.outboundLinks = [];
            vm.filter = '';

            vm.changePageNumber = changePageNumber;
            vm.renderStatusCodeLabel = contentAuditResource.renderStatusCodeLabel;

            init();

            function init() {
                let skip = vm.pageNumber != 1 ? ((vm.pageNumber - 1) * vm.pageSize) : 0;
                let take = vm.pageSize;

                contentAuditResource
                    .getOutboundLinks(
                        skip,
                        take,
                        vm.filter
                    )
                   .then(function (data) { vm.totalPages = Math.ceil(data.total / vm.pageSize);
                        vm.outboundLinks = data.items;
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