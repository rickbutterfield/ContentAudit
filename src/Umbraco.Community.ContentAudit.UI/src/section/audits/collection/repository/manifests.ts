import { CONTENT_AUDIT_AUDITS_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_AUDITS_COLLECTION_REPOSITORY_ALIAS,
		name: 'Audits Collection Repository',
		api: () => import('./audits-collection.repository.js'),
	},
];
