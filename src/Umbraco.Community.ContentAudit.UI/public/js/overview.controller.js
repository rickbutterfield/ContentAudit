angular.module('umbraco').controller('Umbraco.Community.ContentAudit.OverviewController', ['$scope', '$sce', '$location', '$routeParams', 'Umbraco.Community.ContentAudit.Resource', 'overlayService', 'notificationsService',
    function ($scope, $sce, $location, $routeParams, contentAuditResource, overlayService, notificationsService) {

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
        vm.externalCrawled = 0;
        vm.assetsCrawled = 0;
        vm.blockedUrls = 0;

        vm.topIssues = [];
        vm.healthScore = 0;
        vm.scoreClass = "";

        vm.startAudit = startAudit;
        vm.renderTypeLabel = contentAuditResource.renderTypeLabel;
        vm.renderPriorityLabel = contentAuditResource.renderPriorityLabel;

        init();

        function init() {
            vm.buttonState = undefined;

            getLatestAuditOverview();
            getTopIssues();
            getHealthScore();
        }

        function getLatestAuditOverview() {
            contentAuditResource.getLatestAuditOverview().then(function (data) {
                vm.latestAuditOverview = data;
                if (vm.latestAuditOverview.runDate !== null) {
                    vm.latestAuditOverview.runDate = new Date(vm.latestAuditOverview.runDate);
                }
            });
        }

        function getHealthScore() {
            contentAuditResource.getHealthScore().then(function (data) {
                vm.healthScore = data;

                vm.scoreClass = "score--danger";

                if (vm.healthScore.healthScore >= 90) {
                    vm.scoreClass = "score--success";
                }

                else if (vm.healthScore.healthScore >= 50) {
                    vm.scoreClass = "score--warning";
                }
            });
        }

        function startAudit() {
            const eventSource = new EventSource('/umbraco/content-audit/api/v1/start-crawl');

            vm.scanRunning = true;
            vm.buttonState = 'waiting';
            vm.crawlData = [];
            notificationsService.success("Crawl started", "You will be notified when it is complete.");

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                vm.crawlData.push(data);
                vm.urlsFound++;

                if (data.crawled && !data.asset) {
                    vm.pagesCrawled++;
                }

                if (data.crawled && data.external) {
                    vm.externalCrawled++;
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

                notificationsService.info("Crawl completed", "You can now view the results.");

                eventSource.close();
                init();
            };
        }

        function getTopIssues() {
            contentAuditResource.getAllIssues(0, 5).then(function (data) {
                vm.topIssues = data.items;
            });
        }

        vm.issueDetails = function (unique) {
            $location.search('create', null);
            $location.path("/audit/issues/details/" + unique);
        }

        $scope.openModal = function () {
            var dialog = {
                parentScope: $scope,
                title: "Ready to run an audit?",
                content: "Running an audit scan can be an intensive process, depending on the number of pages on your website. It is not recommended to run a scan at peak times on a live website, as it may cause performance issues. It is recommended to run the scan on a staging or development environment first, or at a quieter time on the live website.",
                submitButtonLabel: "I understand",
                submit: function (model) {
                    vm.startAudit();
                    overlayService.close();
                },
                close: function () {
                    overlayService.close();
                }
            };

            overlayService.open(dialog);
        };
    }
]);