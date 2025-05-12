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
        "$interpolate",
        function ($scope, $timeout, $location, $sce, $routeParams, navigationService, editorService, overlayService, contentAuditResource, $interpolate) {

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

            vm.renderExposedProperty = function (page, property) {
                const aliasParts = property.alias.split('.');
                let value = page;
                for (const part of aliasParts) {
                    if (value && typeof value === 'object') {
                        value = value[part];
                    } else {
                        break;
                    }
                }

                if (!property.labelTemplate) {
                    return value;
                }
                else {
                    var val = $interpolate(property.labelTemplate);
                    return val({ value });
                }
            }
        }
    ]);