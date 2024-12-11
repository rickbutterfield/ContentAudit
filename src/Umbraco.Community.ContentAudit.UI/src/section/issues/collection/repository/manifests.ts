import { CONTENT_AUDIT_ISSUES_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_ISSUES_COLLECTION_REPOSITORY_ALIAS,
		name: 'Issue Collection Repository',
		api: () => import('./issue-collection.repository.js'),
	},
];
