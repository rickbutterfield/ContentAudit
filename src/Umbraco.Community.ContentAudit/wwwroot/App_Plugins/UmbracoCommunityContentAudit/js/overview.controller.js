angular.module('umbraco').controller('Umbraco.Community.ContentAudit.OverviewController', ['$scope', '$sce', '$routeParams', 'Umbraco.Community.ContentAudit.Resource',
    function ($scope, $sce, $routeParams, contentAuditResource) {

        var vm = this;

        vm.latestAuditOverview = {
            runDate: null,
            total: 0,
            totalInternal: 0,
            totalAssets: 0,
            totalBlocked: 0
        };

        vm.scanRunning = false;
        vm.buttonState = undefined;

        vm.crawlData = [];
        vm.urlsFound = 0;
        vm.pagesCrawled = 0;
        vm.assetsCrawled = 0;
        vm.blockedUrls = 0;

        vm.topIssues = [];

        vm.startAudit = startAudit;

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
            vm.buttonState = undefined;

            getLatestAuditData();
            getTopIssues();
        }

        function getLatestAuditData() {
            contentAuditResource.getLatestAuditData().then(function (data) {
                vm.latestAuditOverview = data;
            });
        }

        function startAudit() {
            const eventSource = new EventSource('/umbraco/content-audit/api/v1/start-crawl');

            vm.scanRunning = true;
            vm.buttonState = 'waiting';
            vm.crawlData = [];

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                vm.crawlData.push(data);
                vm.urlsFound++;

                if (data.crawled && !data.asset) {
                    vm.pagesCrawled++;
                }

                if (data.crawled && data.asset) {
                    vm.assetsCrawled++;
                }

                if (data.blocked) {
                    vm.blockedUrls++;
                }
            };

            eventSource.onerror = (error) => {
                if (eventSource.readyState === EventSource.CLOSED) {
                    console.log('EventSource connection closed by the server.');
                } else {
                    console.error('EventSource encountered an error:', error);
                }
                vm.scanRunning = false;
                vm.buttonState = 'success';
                eventSource.close();
                init();
            };
        }

        function getTopIssues() {
            contentAuditResource.getAllIssues(0, 5).then(function (data) {
                vm.topIssues = data.items;
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
    }
]);