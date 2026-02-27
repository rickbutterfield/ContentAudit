export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'modal',
		alias: 'ContentAudit.Modal.RunWarning',
		name: 'Run Warning Modal',
		element: () => import('./run-warning/run-warning-modal.element'),
	},
];
