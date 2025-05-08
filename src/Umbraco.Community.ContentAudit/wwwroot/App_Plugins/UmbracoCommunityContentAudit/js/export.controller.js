angular.module('umbraco').controller('Umbraco.Community.ContentAudit.Controller.Export', ['$scope', '$sce', '$location', '$routeParams', "navigationService", 'Umbraco.Community.ContentAudit.Resource',
    function ($scope, $sce, $location, $routeParams, navigationService, contentAuditResource) {

        navigationService.syncTree({ tree: $routeParams.tree, path: [-1] });

        var vm = this;

        vm.name = "Export";

        init();

        function init() {
        }

        vm.exportCsv = function ($event) {
            $event.preventDefault();

            contentAuditResource.getExportData().then(function (data) {
                if (data) {
                    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'content-audit-export.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        }
    }
]);