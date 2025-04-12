import { CONTENT_AUDIT_ALL_PAGES_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_ALL_PAGES_COLLECTION_REPOSITORY_ALIAS,
		name: 'All Pages Collection Repository',
		api: () => import('./all-pages-collection.repository.js'),
	},
];
