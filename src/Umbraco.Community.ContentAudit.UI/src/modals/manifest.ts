export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'modal',
		alias: 'Umb.ContentAudit.Modal.RunWarning',
		name: 'Run Warning Modal',
		element: () => import('./run-warning/run-warning-modal.element'),
	},
];
