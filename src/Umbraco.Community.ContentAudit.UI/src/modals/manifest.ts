export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'modal',
		alias: 'ContentAudit.Modal.RunWarning',
		name: 'Run Warning Modal',
		element: () => import('./run-warning/run-warning-modal.element'),
	},
	{
		type: 'modal',
		alias: 'ContentAudit.Modal.DiscardAndRun',
		name: 'Discard and Run Modal',
		element: () => import('./discard-and-run/discard-and-run-modal.element'),
	},
];
