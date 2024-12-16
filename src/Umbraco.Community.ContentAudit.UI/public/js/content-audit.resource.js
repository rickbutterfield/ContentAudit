(function () {
    'use strict';

    function contentAuditResource($http, umbRequestHelper) {
        let apiUrl = "/umbraco/content-audit/api/v1";

        let resource = {
            getLatestAuditData: getLatestAuditData,
            getAllIssues: getAllIssues,
        };

        function getLatestAuditData(skip, take, filter) {
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

        return resource;
    }

    angular.module('umbraco.resources').factory('Umbraco.Community.ContentAudit.Resource', contentAuditResource);
})();