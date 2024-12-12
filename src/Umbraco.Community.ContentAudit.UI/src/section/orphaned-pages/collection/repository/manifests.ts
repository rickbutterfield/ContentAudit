import { CONTENT_AUDIT_ORPHANED_PAGES_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_ORPHANED_PAGES_COLLECTION_REPOSITORY_ALIAS,
		name: 'Orphaned Pages Collection Repository',
		api: () => import('./orphaned-pages-collection.repository.js'),
	},
];
