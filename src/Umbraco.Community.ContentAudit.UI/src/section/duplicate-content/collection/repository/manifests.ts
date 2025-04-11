import { CONTENT_AUDIT_DUPLICATE_CONTENT_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_DUPLICATE_CONTENT_COLLECTION_REPOSITORY_ALIAS,
		name: 'Duplicate Content Collection Repository',
		api: () => import('./duplicate-content-collection.repository.js'),
	},
];
