import { CONTENT_AUDIT_OUTBOUND_LINKS_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_OUTBOUND_LINKS_COLLECTION_REPOSITORY_ALIAS,
		name: 'Outbound Links Collection Repository',
		api: () => import('./outbound-links-collection.repository.js'),
	},
];
