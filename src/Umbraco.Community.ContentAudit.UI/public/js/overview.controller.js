angular.module('umbraco').controller('Umbraco.Community.ContentAudit.OverviewController', ['$scope', '$routeParams', 'Umbraco.Community.ContentAudit.Resource',
    function ($scope, $routeParams, contentAuditResource) {

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
    }
]);