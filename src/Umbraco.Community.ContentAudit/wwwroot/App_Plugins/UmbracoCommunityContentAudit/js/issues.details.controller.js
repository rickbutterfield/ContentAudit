angular
    .module("umbraco")
    .controller("Umbraco.Community.ContentAudit.Issues.DetailsController", [
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
            vm.data = {};
            vm.loading = true;

            vm.renderTypeLabel = contentAuditResource.renderTypeLabel;
            vm.renderPriorityLabel = contentAuditResource.renderPriorityLabel;

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1] });

            init();

            function init() {
                contentAuditResource.getIssue($routeParams.id).then(data => {
                    vm.data = data;
                    vm.loading = false;
                });
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

            vm.back = function () {
                $location.path("audit/issues/overview");
            }
        }
    ]);