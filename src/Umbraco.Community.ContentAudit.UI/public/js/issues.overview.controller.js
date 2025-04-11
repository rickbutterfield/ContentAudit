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

            vm.issueDetails = function (unique) {
                $location.search('create', null);
                $location.path("/audit/issues/details/" + unique);
            }
        }
    ]);