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

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1] });

            const issueTypeConfigMap = [
                {
                    label: 'Opportunity',
                    icon: 'icon-info',
                    class: 'opportunity',
                    color: 'default'
                },
                {
                    label: 'Warning',
                    icon: 'icon-stop-alt',
                    class: 'warning',
                    color: 'warning'
                },
                {
                    label: 'Issue',
                    icon: 'icon-alert',
                    class: 'issue',
                    color: 'danger'
                }
            ];

            const issuePriorityConfigMap = [
                {
                    label: 'Low',
                    icon: 'icon-navigation-bottom',
                    class: 'low',
                    color: 'default'
                },
                {
                    label: 'Medium',
                    icon: 'icon-navigation-road',
                    class: 'medium',
                    color: 'warning'
                },
                {
                    label: 'High',
                    icon: 'icon-navigation-top',
                    class: 'high',
                    color: 'danger'
                }
            ];

            init();

            function init() {
                contentAuditResource.getIssue($routeParams.id).then(data => {
                    vm.data = data;
                    vm.loading = false;
                });
            }

            vm.renderTypeLabel = function (type) {
                let index = type - 1;
                let config = issueTypeConfigMap[index];
                return $sce.trustAsHtml(`
                    <uui-tag color="${config.color}">
                        <uui-icon name="${config.icon}"></uui-icon>
                        ${config.label}
                    </uui-tag>
                `);
            }

            vm.renderPriorityLabel = function (priority) {
                let index = priority - 1;
                let config = issuePriorityConfigMap[index];
                return $sce.trustAsHtml(`
                    <uui-tag color="${config.color}">
                        <uui-icon name="${config.icon}"></uui-icon>
                        ${config.label}
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

            vm.back = function () {
                $location.path("audit/issues/overview");
            }
        }
    ]);