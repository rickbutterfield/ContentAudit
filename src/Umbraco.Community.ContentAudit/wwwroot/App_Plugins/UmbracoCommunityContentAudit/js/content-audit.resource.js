(function () {
    'use strict';

    function contentAuditResource($http, umbRequestHelper) {
        let apiUrl = "/umbraco/content-audit/api/v1";

        let resource = {
            getLatestAuditOverview: getLatestAuditOverview,
            getLatestAuditData: getLatestAuditData,
            getAllIssues: getAllIssues,
            getIssue: getIssue,
            getHealthScore: getHealthScore,
            getSettings: getSettings,
            getOutboundLinks: getOutboundLinks,
            getInboundLinks: getInboundLinks,
            getDuplicatePages: getDuplicatePages,
            getImageAltText: getImageAltText,
            getMetadata: getMetadata
        };

        function getLatestAuditOverview(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/latest-audit`),
                'Failed getting latest audit data'
            )
        }

        function getAllIssues(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/all-issues?skip=${skip}&take=${take}&filter=${filter}`),
                'Failed getting all issue data'
            )
        }

        function getIssue(unique) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/issue?issueGuid=${unique}`),
                `Failed getting issue ${unique} data`
            )
        }

        function getOutboundLinks(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/external-links?skip=${skip}&take=${take}&filter=${filter}`),
                'Failed getting outbound links data'
            )
        }

        function getInboundLinks(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/internal-links?skip=${skip}&take=${take}&filter=${filter}`),
                'Failed getting inbound links data'
            )
        }

        function getHealthScore() {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/health-score`),
                'Failed getting health score data'
            )
        }

        function getLatestAuditData(skip, take, filter, statusCode) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/latest-data?skip=${skip}&take=${take}&filter=${filter}&statusCode=${statusCode}`),
                'Failed getting latest audit data'
            )
        }

        function getDuplicatePages(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/duplicate-content?skip=${skip}&take=${take}&filter=${filter}`),
                'Failed getting duplicate pages data'
            )
        }

        function getImageAltText(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/all-images?skip=${skip}&take=${take}&filter=${filter}`),
                'Failed getting image data'
            )
        }

        function getMetadata(skip, take, filter) {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/missing-metadata?skip=${skip}&take=${take}&filter=${filter}`),
                'Failed getting image data'
            )
        }

        function getSettings() {
            return umbRequestHelper.resourcePromise(
                $http.get(`${apiUrl}/get-settings`),
                'Failed getting settings data'
            )
        }

        return resource;
    }

    angular.module('umbraco.resources').factory('Umbraco.Community.ContentAudit.Resource', contentAuditResource);
})();