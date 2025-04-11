angular.module('umbraco').controller('Umbraco.Community.ContentAudit.SettingsController', ['$scope', '$sce', '$routeParams', 'Umbraco.Community.ContentAudit.Resource', 'overlayService',
    function ($scope, $sce, $routeParams, contentAuditResource, overlayService) {

        var vm = this;
        vm.settings = {};

        init();

        function init() {
            getSettings();
        }

        function getSettings() {
            contentAuditResource.getSettings().then(function (data) {
                vm.settings = data;
            });
        }
    }

]);