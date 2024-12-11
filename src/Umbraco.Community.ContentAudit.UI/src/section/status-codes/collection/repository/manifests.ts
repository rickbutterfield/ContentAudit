import { CONTENT_AUDIT_STATUS_CODES_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_STATUS_CODES_COLLECTION_REPOSITORY_ALIAS,
		name: 'Status Codes Collection Repository',
		api: () => import('./status-codes-collection.repository.js'),
	},
];
